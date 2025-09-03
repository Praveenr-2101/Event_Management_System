from django.urls import path
from .views import EventListCreateAPIView, EventDetailAPIView,EventListAPIView

urlpatterns = [
    path("event/", EventListCreateAPIView.as_view(), name="event-list-create"),
    path("events/<uuid:pk>/", EventDetailAPIView.as_view(), name="event-detail"),
    path("events/", EventListAPIView.as_view(), name="event-list"),
]
