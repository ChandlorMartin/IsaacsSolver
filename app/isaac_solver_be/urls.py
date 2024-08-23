from django.urls import path
from isaac_solver_be.views import MaterialView

urlpatterns = [
    path('material', MaterialView.as_view)
    ]