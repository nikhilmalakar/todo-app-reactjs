import React, { useState } from "react";
import Input from "./Input";
import List from "./List";
import Header from "./Header";
import Footer from "./Footer";
import { v4 as uuidv4 } from 'uuid';

    function MainFrame(){

        

        const [todayTasks, setTodayTasks] = useState([]);
        const [tomorrowTasks, setTomorrowTasks] = useState([]);
        const [weekTasks, setWeekTasks] = useState([]);

        const handleSubmit = (todoTitle, todoDesc, dline) => {
            // e.preventDefault();
            console.log(dline);

            let realDateObject = new Date(dline);

            if (isToday(realDateObject)) {
            setTodayTasks((prevTasks) => [...prevTasks, { id: uuidv4(), title : todoTitle, description : todoDesc, deadline : dline}]);
            } else if (isTomorrow(realDateObject)) {
            setTomorrowTasks((prevTasks) => [...prevTasks, { id: uuidv4(), title : todoTitle, description : todoDesc, deadline : dline }]);
            } else if (isUpcomingWeek(realDateObject)) {
            setWeekTasks((prevTasks) => [...prevTasks, { id: uuidv4(), title : todoTitle, description : todoDesc, deadline : dline}]);
            }
        };

        const isToday = (date) => {
            const currentDate = new Date();
            return date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
          };
        
          const isTomorrow = (date) => {
            const currentDate = new Date();
            const tomorrow = new Date(currentDate);
            tomorrow.setDate(currentDate.getDate() + 1);
            return date.getDate() === tomorrow.getDate() && date.getMonth() === tomorrow.getMonth() && date.getFullYear() === tomorrow.getFullYear();
          };
        
          const isUpcomingWeek = (date) => {
            const currentDate = new Date();
            const upcomingWeekEndDate = new Date(currentDate);
            upcomingWeekEndDate.setDate(currentDate.getDate() + 7);
            return date >= currentDate && date <= upcomingWeekEndDate;
          };
        

        function deleteItem(id){
            const newTodayList = todayTasks.filter((task) => {
                return task.id !== id;
            });
            const newTomorrowList = tomorrowTasks.filter((task) => {
                return task.id !== id;
            });
            const newWeekList = weekTasks.filter((task) => {
                return task.id !== id;
            });

            setTodayTasks(newTodayList);
            setTomorrowTasks(newTomorrowList);
            setWeekTasks(newWeekList);
        }

        console.log(todayTasks);

        return (
            <div>
                <Header />
                <div className="main">
                    
                        <div className="list-container">
                            <List title="Upcoming Week" tasks ={weekTasks} onChecked={deleteItem}/>

                            <div className="center-container">
                                <Input title="input-container" onAdd={handleSubmit} />
                                <List title="" style="today-container" tasks={todayTasks} onChecked={deleteItem}/>
                            </div>
                            
                            <List title="Plans for Tomorrow"  tasks={tomorrowTasks} onChecked={deleteItem}/>
                        </div>
                        {console.log(todayTasks)}
                </div>
                <Footer />
            </div>
        )
    }

export default MainFrame;
