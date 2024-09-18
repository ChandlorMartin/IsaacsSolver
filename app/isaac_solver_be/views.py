from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from isaac_solver_be.models import Material
from isaac_solver_be.forms.mechanics.average_speed import AverageSpeedForm
from django.http import JsonResponse
import json
from decimal import Decimal

from isaac_solver_be.utilities import convertValue

def printInfo(info):
    print("------------------------------------------")
    print(info)

def containsKey(dict_list, key):
    return any(key in d for d in dict_list)

def getListOfKeys(dict_list, keys_to_match):
    return list(filter(lambda d: all(k in d for k in keys_to_match), dict_list))


class CalculateAverageSpeed(APIView):
    #template_name = "../templates/mechanics/average_speed.html"
    form_class = AverageSpeedForm

    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            printInfo("Post recieved")
            form = AverageSpeedForm(data=request.data)

            #distance_unit = form.cleaned_data['distance_unit']
            #time_interval_unit = form.cleaned_data['time_interval_unit']
            #average_speed_distance_unit = form.cleaned_data['average_speed_distance_unit']
            #average_speed_time_interval_unit = form.cleaned_data['average_speed_time_interval_unit']

            if form.is_valid():
                printInfo("FORM IS VALID")
                
                distance_unit = form.cleaned_data['distance_unit']
                time_interval_unit = form.cleaned_data['time_interval_unit']
                average_speed_distance_unit = form.cleaned_data['average_speed_distance_unit']
                average_speed_time_interval_unit = form.cleaned_data['average_speed_time_interval_unit']
                distance_error = ""
                time_interval_error = ""
                average_speed_error = ""
                non_field_errors = ""
                willConvert = False

                if(distance_unit != average_speed_distance_unit or time_interval_unit != average_speed_time_interval_unit):
                    willConvert = True


                if not form.cleaned_data['average_speed']:
                    distance = Decimal(form.cleaned_data['distance'])
                    time_interval = Decimal(form.cleaned_data['time_interval'])
                    average_speed = convertValue(distance, distance_unit, average_speed_distance_unit) / convertValue(time_interval, time_interval_unit, average_speed_time_interval_unit)
                elif not form.cleaned_data['distance']:
                    average_speed = Decimal(form.cleaned_data['average_speed'])
                    converted_average_speed = convertValue(average_speed, average_speed_distance_unit + "/" + average_speed_time_interval_unit, distance_unit + "/" + time_interval_unit)
                    time_interval = Decimal(form.cleaned_data['time_interval'])
                    distance = converted_average_speed * time_interval
                else:
                    average_speed = Decimal(form.cleaned_data['average_speed'])
                    converted_average_speed = Decimal(convertValue(average_speed, average_speed_distance_unit + "/" + average_speed_time_interval_unit, distance_unit + "/" + time_interval_unit))
                    distance = Decimal(form.cleaned_data['distance'])
                    time_interval = distance / converted_average_speed

                context = { "distance": distance, "distanceUnit":distance_unit, "distanceError": distance_error,
                            "timeInterval": time_interval, "timeIntervalUnit": time_interval_unit, "timeIntervalError": time_interval_error, 
                            "averageSpeed": average_speed, "averageSpeedError": average_speed_error, "averageSpeedDistanceUnit": average_speed_distance_unit,
                            "averageSpeedTimeIntervalUnit": average_speed_time_interval_unit, "nonFieldErrors": non_field_errors }

                return JsonResponse(context)
            else:
                printInfo("FORM IS NOT VALID")
                distance_unit = form.cleaned_data['distance_unit']
                time_interval_unit = form.cleaned_data['time_interval_unit']
                average_speed_distance_unit = form.cleaned_data['average_speed_distance_unit']
                average_speed_time_interval_unit = form.cleaned_data['average_speed_time_interval_unit']
                distance_error = ""
                time_interval_error = ""
                average_speed_error = ""
                non_field_errors = ""
                error_messages = {}

                for field, errors in form.errors.items():
                    error_messages[field] = ', '.join(errors)
                
                if containsKey(error_messages, "distance"):
                    distance_error = error_messages["distance"]

                if containsKey(error_messages, "time_interval"):
                    time_interval_error = error_messages["time_interval"]

                if containsKey(error_messages, "average_speed"):
                    average_speed_error = error_messages["average_speed"]

                if containsKey(error_messages, "__all__"):
                    non_field_errors = error_messages["__all__"]

                
                average_speed = form.data.get('average_speed')
                distance = form.data.get('distance')
                time_interval = form.data.get('time_interval')
                
                context = { "distance": distance, "distanceUnit":distance_unit, "distanceError": distance_error, 
                            "timeInterval": time_interval, "timeIntervalUnit": time_interval_unit,"timeIntervalError": time_interval_error,
                            "averageSpeed": average_speed, "averageSpeedDistanceUnit": average_speed_distance_unit,"averageSpeedTimeIntervalUnit": average_speed_time_interval_unit,
                            "averageSpeedError": average_speed_error, "nonFieldErrors": non_field_errors }
                return JsonResponse(context)
                
        else:

            printInfo("POST request not received")
            form = AverageSpeedForm()

        return Response(request, {'form': form})
# Create your views here.




class MaterialView(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data.dict()
        material = Material(name=data['name'], linear_coefficient=data['linear_coefficient'], volumetric_coefficient=['volumetric_coefficient'], remove=data['remove'])
        material.save()
        return Response(200)

    def get(self, request, *args, **kwargs):
        items = [(x.name, x.linear_coefficient, x.volumetric_coefficient, x.remove) for x in Material.objects.all]
        return response(items)