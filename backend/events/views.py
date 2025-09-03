from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Event
from .serializers import EventSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from common.pagination import CustomCursorPagination
from rest_framework.generics import ListAPIView
from django.db import DatabaseError

import logging

logger = logging.getLogger(__name__) 

class EventListCreateAPIView(APIView):
    
    permission_classes = [IsAuthenticated]
    # def get(self, request):
    #     try:
    #         logger.info("Request received to list all events")
    #         events = Event.objects.all().order_by("-created_at")
    #         serializer = EventSerializer(events, many=True)
    #         logger.debug(f"Successfully retrieved {len(events)} events")
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     except DatabaseError as e:
    #         logger.error(f"Database error while fetching events {str(e)}", exc_info=True)
    #         return Response({"error": "Database error", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    #     except Exception as e:
    #         logger.error(f"Unexpected error while fetching events: {str(e)}", exc_info=True)
    #         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            logger.info("Attempting to create a new event")
            serializer = EventSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                logger.info(f"Successfully created event")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            logger.warning(f"Invalid data provided for event creation: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            logger.error(f"Unexpected error while creating event: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EventDetailAPIView(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            logger.info(f"Fetching event with ID {pk}")
            event = get_object_or_404(Event, pk=pk)
            serializer = EventSerializer(event)
            logger.debug(f"Successfully retrieved event with ID {pk}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error fetching event with ID {pk}: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            logger.info(f"Attempting to update event with ID {pk}")
            event = get_object_or_404(Event, pk=pk)
            serializer = EventSerializer(event, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                logger.info(f"Successfully updated event with ID {pk}")
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            logger.warning(f"Invalid data provided for updating event ID {pk}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Unexpected error while updating event ID")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
            logger.info(f"Attempting to delete event with ID {pk}")
            event = get_object_or_404(Event, pk=pk)
            event.delete()
            logger.info(f"Successfully deleted event with ID {pk}")
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            logger.error(f"Error while deleting event ID {pk}: {str(e)}", exc_info=True)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EventListAPIView(ListAPIView):
    
    permission_classes = [IsAuthenticated]
    serializer_class = EventSerializer
    pagination_class = CustomCursorPagination
    
    def get_queryset(self):
        try:
            title_query = self.request.query_params.get("title", None)

            if title_query:
                logger.info(f"Searching events with title containing: '{title_query}'")
                return Event.objects.filter(title__icontains=title_query).order_by("-date")
            
            logger.info("Fetching all events")
            return Event.objects.all().order_by("-date")
        except Exception as e:
            logger.error(f"Error fetching events queryset: {e}", exc_info=True)
            return Event.objects.none()