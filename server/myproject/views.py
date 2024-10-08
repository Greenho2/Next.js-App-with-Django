#HardCoded Data from the given data for the API calls

from django.http import JsonResponse

def get_candlestick_data(request):
    data =  {
        "data": [
        {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
        {"x": "2023-01-02", "open": 35, "high": 45, "low": 30, "close": 40},
        ]}
    return JsonResponse(data, safe=False)

def get_line_chart_data(request):
    data =  {
        "labels": ["Jan", "Feb", "Mar", "Apr"],
        "data": [10, 20, 30, 40]
    }
    return JsonResponse(data, safe=False)

def get_bar_chart_data(request):
    data =  {
        "labels": ["Product A", "Product B", "Product C"],
        "data": [100, 150, 200]
        }
    return JsonResponse(data, safe=False)

def get_pie_chart_data(request):
    data =  {
        "labels": ["Red", "Blue", "Yellow"],
        "data": [300, 50, 100]
        }
    return JsonResponse(data, safe=False)
