from django.urls import path
from .views import EventListCreateAPIView, EventDetailAPIView,EventListAPIView

urlpatterns = [
    path("events/", EventListCreateAPIView.as_view(), name="event-list-create"),
    path("events/<uuid:pk>/", EventDetailAPIView.as_view(), name="event-detail"),
    path("events/search/", EventListAPIView.as_view(), name="event-list"),
]
