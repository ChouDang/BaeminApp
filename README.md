# BaeminApp - Đặng Hoài Trọng

- Có upload `.env` BE chạy localhost.

## Feature
- Đăng nhập, đăng ký, JWT
- Xem danh sách restaurants theo categories ( phân trang, search ( food name, restaurant name ) ) BE
- Xem chi tiết restaurants có foods (search, filter categories ,thêm món vào giỏ hàng)
- Giỏ hàng có thể thêm nhiều food của nhiều restaurant thanh toán 1 lần
- Thanh toán tự trừ tồn kho và ra đơn orders với order_food 

## DB - PostgreSQL
### Relation Table 
- `categories` - `foods`: 1-n (1 danh mục có nhiều món ăn).
- `restaurants` - `foods`: 1-n (1 nhà hàng có nhiều món ăn).
- `orders` - `order_food`: 1-n (1 đơn hàng có nhiều món ăn).
- `users` - `orders`: 1-n (1 người dùng có nhiều đơn hàng).
- `foods` - `order_food`: n-1 (Nhiều món ăn có thể nằm trong nhiều đơn hàng).

## API: 
- **User**: login, đăng ký, CRUD user 	
- **Categories**: CRUD categories 
- **Restaurant**: CRUD restaurant 
  - Thêm món ăn vào nhà hàng 			
- **Foods**: CRUD foods 
- **Payment**: 
  - Auth JWT			
  - CRUD order
  - Tạo đơn hàng với món ăn của nhà hàng 
