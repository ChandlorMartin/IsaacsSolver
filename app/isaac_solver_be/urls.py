from django.urls import path
from isaac_solver_be.views import MaterialView
from isaac_solver_be.views import CalculateAverageSpeed

urlpatterns = [
    path('material', MaterialView.as_view),
    path('calculate_average_speed/', CalculateAverageSpeed.as_view(), name='calculate-average-speed'),
    ]