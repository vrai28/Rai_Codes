# Select statement
create database subqueries;
show databases;
use subqueries;

create table employees_c (Emp_Id int primary key, Emp_name varchar(25), 
Age int, Gender char(1), Doj date, Dept varchar(20), City varchar(15), Salary float);

create table employees_d (Emp_Id int primary key, Emp_name varchar(25), 
Age int, Gender char(1), Doj date, Dept varchar(20), City varchar(15), Salary float);

show tables;

insert into employees_c 
values("111","Jimmy", 35,"M", "2005-05-30", "Product" ,"Chicago", 70000),
("112","Shane", 30, "M", "1999-06-25", "Sales","Maimi", 55000),
("113","Mary", 28, "F", "2009-03-10","HR", "Boston", 62000),
("114","Dwayne", 37, "M", "2011-07-12", "IT","Austin", 57000),
("115","Sara", 32, "F", "2017-10-27","Finance", "New York", 72000),
("116","Amy", 35, "F", "2014-12-20", "Marketing","Seattle", 80000),
("117","Bella", 29, "F", "2002-06-11", "Tech","Detroit", 83000);


select * from employees_C ;

insert into employees_d
values("111","Jack", 40,"M", "2007-06-30", "Product" ,"Texas", 90000),
("112","Waston", 30, "M", "1999-06-25", "Sales","Maimi", 55000),
("113","Andrea", 20, "F", "2012-03-10","HR", "Boston", 72000),
("114","Rock", 37, "M", "2012-07-12", "IT","New York", 67000),
("115","Sara", 32, "F", "2017-10-27","Finance", "New York", 72000),
("116","Rose", 25, "F", "2014-12-20", "Marketing","Seattle", 100000),
("117","Bella", 29, "F", "2002-06-11", "Tech","Detroit", 83000);

select * from employees_d ;

select Emp_name, dept , salary from employees_c
where salary < (select avg( salary) from employees_c);

#Insert subquery
create table products_a
(product_id int, item varchar(30), sell_price float, product_type varchar(30));

insert into products_a
values(101,'Jewellery', 1800, 'Luxury'),
(102, 'T-shirt' , 100 , 'Non-Luxury'),
(103, 'Laptop' , 1300 , 'Luxury'),
(104, 'Table' , 400 , 'Non-Luxury');

select * from products_a;

create table orders_a
(order_id int, product_sold varchar(30), selling_price float);

insert into orders_a
select product_id,item,sell_price
from products_a where product_id in
(select product_id from products where sell_price>1000);

select * from orders_a;

# Update subquery

select * from employees_c  ;

update employees_c 
set salary = salary * 0.35
where Age in (select age from employees_d where age<=27);

select * from employees_c ;

# Delete subquery

delete from employees_c
where age in (select age from employees_d where age <=32);

select * from employees_c ;














