class Grids():


    def __init__(self, grid_string):
        self.grid_string = grid_string.strip()
        self.grid = self.create_grid()
        self.solved_grid = self.create_solved_grid()
        self.solved_grid_string = self.create_solved_grid_string()

    def create_grid(self):
        string_iter = 0
        string_vals = list(map(int, self.grid_string.split()))
        grid = []
        for i in range(9):
            row = []
            for j in range(9):
                row.append(string_vals[string_iter])
                string_iter += 1
            grid.append(row)
        
        return grid

    def is_possible(self, y, x, n):
        for i in range(9):
            if self.grid[y][i] == n:
                return False
    
        for i in range(9):
            if self.grid[i][x] == n:
                return False

        x0, y0 = list(map(lambda number: (number // 3) * 3, [x, y]))

        for i in range(3):
            for j in range(3):
                if self.grid[y0+i][x0+j] == n:
                    return False
        return True
    
    def solve_grid(self):
        for y in range(9):
            for x in range(9):
                if self.grid[y][x] == 0:
                    for n in range(1, 10):
                        if self.is_possible(y, x, n):
                            self.grid[y][x] = n
                            self.solve_grid()
                            self.grid[y][x] = 0
                    return
        with open('solution.txt', 'w') as file:
            file.write(f"{self.grid}")
        
    def create_solved_grid(self):
        self.solve_grid()
        grid = None
        with open('solution.txt', 'r') as file:
            grid = eval(file.read())
        
        return grid
    
    def create_solved_grid_string(self):
        string = ""
        counter = 0
        for i in range(9):
            for j in range(9):
                string += f"{self.solved_grid[i][j]} "
        return string[:-1]

    def verify_solution(self):
        if len(self.grid_string) < 161:
            return False
        for i in range(9):
            for j in range(9):
                if self.grid[i][j] > 9 or self.grid[i][j] < 0:
                    return False
                if self.grid[i][j] == 0 or self.grid[i][j] == self.solved_grid[i][j]:
                    continue
                return False
        return True