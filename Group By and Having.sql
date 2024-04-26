show databases;

use sql_intro;

show tables;

create table employees (Emp_Id int primary key, Emp_name varchar(25), 
Age int, Gender char(1), Doj date, Dept varchar(20), City varchar(15), Salary float);

describe employees;

insert into employees 
values("111","Jimmy", 35,"M", "2005-05-30", "Product" ,"Chicago", 70000),
("112","Shane", 30, "M", "1999-06-25", "Sales","Maimi", 55000),
("113","Mary", 28, "F", "2009-03-10","HR", "Boston", 62000),
("114","Dwayne", 37, "M", "2011-07-12", "IT","Austin", 57000),
("115","Sara", 32, "F", "2017-10-27","Finance", "New York", 72000),
("116","Amy", 35, "F", "2014-12-20", "Marketing","Seattle", 80000),
("117","Bella", 29, "F", "2002-06-11", "Tech","Detroit", 83000);

select * from employees;

select distinct city from employees;

select distinct dept from employees;

select avg(age) from employees;

#avg age in each dept

select dept, avg(age) as average_age from employees group by dept;

select dept, round(avg(age),1) as average_age from employees 
group by dept;

select dept, sum(salary) as total_salary from employees
group by dept;

select count(emp_id), city from employees
group by city
order by count(emp_id) desc;

select year(Doj) as year, count(emp_id)
from employees
group by year(Doj);

create table sales(product_id int, sell_price float, quantity int, state varchar(20));

insert into sales values
(121, 320.0, 3, 'California'),
(121, 320.0, 6, 'Texas'),
(121, 320.0, 4, 'Alaska'),
(123, 290.0, 2, 'Texas'),
(123, 290.00, 7, 'California'),
(123, 290.00, 4, 'Washigton'),
(121, 320.0, 7, 'Ohio'),
(121, 320.0, 2, 'Arizona'),
(123, 290.00, 8, 'Colorado');

select * from sales;

select product_id, sum(sell_price* quantity) as revenue
from sales group by product_id;

create table c_product (product_id int, cost_price float);

insert into c_product
values(121, 270.0),
(123, 250.0);

select c.product_id, sum((s.sell_price - c.cost_price) * s.quantity) as profit
from sales as s inner join c_product as c
where s.product_id = c.product_id
group by c.product_id;

select * from employees;

select dept, avg(salary) as avg_salary 
from employees
group by dept
having avg(salary) > 75000;

select city, sum(salary) as total
from employees
group by city
having sum(salary) > 2000;

select dept,count(*) as emp_count
from employees 
group by dept
having count(*)>2;

select city, count(*) as emp_count
from employees 
where city !="Maimi"
group by city
having count(*) > 2;

select dept, count(*) as emp_count
from employees 
group by dept
having avg(salary) > 75000;


