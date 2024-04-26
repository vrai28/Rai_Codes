show databases;
use mysql;
show tables;
select * from columns_priv;
create database sql_intro;
show databases;

create table employee_details (Name varchar(25), Age int, sex char(1), DOJ date, city varchar(15), salary float);

describe employee_details;

insert into employee_details
values("Jimmy", 35,"M", "2005-05-30", "Chicago", 70000),
("Shane", 30, "M", "1999-06-25", "Seattle", 55000),
("Mary", 28, "F", "2009-03-10", "Boston", 62000),
("Dwayne", 37, "M", "2011-07-12", "Austin", 57000),
("Sara", 32, "F", "2017-10-27", "New York", 72000),
("Amy", 35, "F", "2014-12-20", "Seattle", 80000);

select * from employee_details;

select distinct city from employee_details;

select count(name) as count_name from employee_details;

select sum(salary) as sum_salary from employee_details;

select avg(salary) as sum_salary from employee_details;

select name, age, city from employee_details;

select * from employee_details where age>30;

select name, sex, city from employee_details where sex = 'F';

select * from employee_details where 
city = 'Chicago' or city = 'Austin';

select * from employee_details where 
city in ('Chicago', 'Austin');

select * from employee_details where
DOJ between '2000-01-01' and '2010-12-31';

select * from employee_details where
age>30 and sex ='M';

select sex, sum(salary) as total_salary from employee_details
group by sex;

select * from employee_details order by salary;
#Order by

select * from employee_details order by salary desc;

select (10+20) as addition;
select(10-20) as subtract;

select length('India') as total_len;

select repeat('@' , 10) as repeat_at;

select upper('India');

select lower('INDIA');

select curdate();

select day(curdate());

select now();

#Strings functions

select upper('India') as upper_case;

select lower('India') as lower_case;

select lcase('INDIA') as lower_case;

select character_length('India') as total_len;

select name, char_length(Name) as total_len
from employee_details;

select concat(" India " , " is " , " in Asia ") as merged;

select DOJ, name, concat(name, "  " , age) as name_age
from employee_details;

select reverse('India');

select reverse(name) from employee_details;



select replace("Orange is a vegetable", "vegetable", "fruit") ;

select length("    India    ");

select length(rtrim("    India    "));

select length(trim("    India    "));

select ltrim("    India    ");

select position("fruit" in "Orange is a fruit") as fruit_name;

select ascii('a');

select ascii('4');


   