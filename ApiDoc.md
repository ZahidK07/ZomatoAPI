~We will get Resataurant Data from Cloud DataBase by using below API's by making it live by herokuApp, These API's can help us to fetch data in our App for{
    Drop Down Menu
    Qucik Search
    Lisitng Page
    Meals and Menus
}

Page 1 API's

List of Restaurant locations >>> http://localhost:7500/locationList

List of Restaurant of citites by state id >>> http://localhost:7500/restaurant/1

Get Data by Meal Types
Quick Search >>> http://localhost:7500/mealTypes


------------------------------------------------------------------------
Page 2 API's

Restaurants by Quick Search 

Gert Data by Meal ID >>> http://localhost:7500/restoList?meal_id=2

Get Data by State ID >>> http://localhost:7500/restoList?state_id=4

Get Data by both State Id and Meal id >>> http://localhost:7500/restoList?state_id=2&meal_id=3

------------------------------------------------------------------------

~Filter API's 
Cuisine filter 
User Getting Data by Clicking Cuisine filter
Get Data by Meal type and Cuisine ID
>>> http://localhost:7500/filter/4?cuisine=1


Cost filter Type 1 
User can filter Data By Low & High Cost
>>> http://localhost:7500/filter/1?lcost=700&hcost=1000

Cost filter Type 2
User Can filter Data By Meal & Low, High Cost with Cuisine
Get Data by Low, High Cost and Cuisine
>>> http://localhost:7500/filter/5?lcost=500&hcost=1000&cuisineId=1

Sort filter
Sort the Data from low to high Price in Quick Search
>>> http://localhost:7500/filter/1?cuisineId=1&sort=1

Sort the Data from high to low Price Quick Search
>>> http://localhost:7500/filter/1?cuisineId=3&sort=-1

Pagination
The Below API will help us to Filter and Sort the Data to Set Skip and Limit in them

>>> http://localhost:7500/filter/1?cuisineId=1&skip=0&limit=2

------------------------------------------------------------------------
Page 3 API's
Restaurant Data with Details

Details Page Data by ObjectId 
>>>  http://localhost:7500/details/6212a964df39420e2f992f54

Details Page Data by restaurant_id 
>>>  http://localhost:7500/details/4   

Menu Data by restaurant_id  
>>> http://localhost:7500/menu/1 

------------------------------------------------------------------------
Page 4 API's
~Place Order
>>> http://localhost:7500/placeOrder


Menu items for users selection
By Selecting the Menu [ 4, 5 ]
>>>localhost:7500/menuItem


------------------------------------------------------------------------
Page 5 API's
~Check Orders 
>>> http://localhost:7500/orders

~Place Order
>>> http://localhost:7500/placeOrder

~Delete Order
for Single Order
>>> http://localhost:7500/deleteOrder

for Order one or More
>>> http://localhost:7500/deleteAllOrders

~Update Order
Orders can be get updated with status Pending, Bank etc
>>> localhost:7500/updateOrder/62165c1c9518f94f2c76c880?status=Order Placed
