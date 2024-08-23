from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from isaac_solver_be.models import Material
# Create your views here.

class MaterialView(APIView):

    def post(self, request):
        data = request.data.dict()
        material = Material(name=data['name'], linear_coefficient=data['linear_coefficient'], volumetric_coefficient=['volumetric_coefficient'], remove=data['remove'])
        material.save()
        return Response(200)

    def get(self, request):
        items = [(x.name, x.linear_coefficient, x.volumetric_coefficient, x.remove) for x in Material.objects.all]
        return response(items)