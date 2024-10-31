# BaeminApp - Đặng hoài Trọng

+ có upload .env BE chạy localhost
  
    Function 
        - Đăng nhập, đăng ký,
        - xem danh sách restaurants theo categories (phân trang, search) BE
        - xem chi tiết restaurants có foods 
        - giỏ hàng có thể thêm nhiều cửa hàng thanh toán 1 lần
        - thanh toán tự trừ tồn kho và ra đơn orders với order_food 
        - security JWT
    DB PostgresQl
        Rela Tabel 
          categories - foods: 1-n (1 danh mục có nhiều món ăn).
          restaurants - foods: 1-n (1 nhà hàng có nhiều món ăn).
          orders - order_food: 1-n (1 đơn hàng có nhiều món ăn).
          users - orders: 1-n (1 người dùng có nhiều đơn hàng).
          foods - order_food: n-1 (Nhiều món ăn có thể nằm trong nhiều đơn hàng).
  	API:  			
          User - login, dk, crud user 	
          Categories - crud categories  
          Restaurant  - curd restaurant 
               				- add food to restaurant 			
          Foods 			- crud foods 
 			    Payment     - auth JWT 			
                  	  - crud order 				
                			- create order with foods of restaurant  
