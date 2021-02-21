from django.shortcuts import render
from rest_framework import generics, status
from .serializers import GridSerializer, CreateGridSerializer
from .models import Grid

from .utils import Grids

from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.
class GridView(generics.ListAPIView):
    queryset = Grid.objects.all()
    serializer_class = GridSerializer


class GetGridView(APIView):
    serializer_class = GridSerializer
    look_up_kwarg = 'gridId'

    def get(self, request, format=None):
        grid_id = request.GET.get(self.look_up_kwarg)
        if grid_id != None:
            grid = Grid.objects.filter(id=grid_id)
            if grid.exists():
                data = GridSerializer(grid[0]).data
                data['unsolved_grid'] = Grids(data.get('grid_string')).grid
                data['solved_grid'] = Grids(data.get('solved_grid_string')).solved_grid

                return Response(data, status=status.HTTP_200_OK)

            return Response({'Game Not Found': 'Invalid Game Id'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Id Parameter not found'}, status=status.HTTP_400_BAD_REQUEST)


class GetGridSolutionView(APIView):
    # serializer_class = GridSerializer
    look_up_kwarg = 'gridString'

    def get(self, request, format=None):
        grid_string = request.GET.get(self.look_up_kwarg)
        grid_string = grid_string.strip()
        if grid_string != None:
            data = {}
            grid = Grids(grid_string)

            # if grid.verify_solution():
            if Grid.objects.filter(grid_string=grid.grid_string).count() == 0:
                new_grid = Grid(grid_string=grid.grid_string, solved_grid_string=grid.solved_grid_string)
                new_grid.save()
            data['grid_string'] = grid.grid_string
            data['solved_grid_string'] = grid.solved_grid_string
            data['unsolved_grid'] = grid.grid
            data['solved_grid'] = grid.solved_grid
            return Response(data, status=status.HTTP_200_OK)

            # return Response({'No Solutions': 'Invalid inputs, solution not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Id Parameter not found'}, status=status.HTTP_400_BAD_REQUEST)




class CreateGridView(APIView):
    serializer_class = CreateGridSerializer
    
    def post(self, request, format=None):
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            check_grid = Grids(serializer.data.get('grid_string'))
            if not check_grid.verify_solution():
                return Response({'No Solutions': 'Invalid string, no solutions found'}, status=status.HTTP_404_NOT_FOUND)
            grid_string = check_grid.grid_string
            solved_grid_string = check_grid.solved_grid_string

            queryset = Grid.objects.filter(grid_string=grid_string)
            if queryset.exists():
                return Response({"Error": "Grid Already Exists"}, status=status.HTTP_409_CONFLICT)
            else:
                grid = Grid(grid_string=grid_string, solved_grid_string=solved_grid_string)
                grid.save()

                return Response(GridSerializer(grid).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
