<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../Style/styles.css">
    <title>Task List</title>
</head>
<body>
    <header id="header" class="light_header">
        <div id="header_container">
            <h2>Task Planner</h2>
            <button id="darkmode_toggle"></button>
        </div>
    </header>
    <main>
        <section id="task_container">
            <section class="task">
                <button id="create_task_button"></button>
                <input maxlength="50" id="task_input" type="text" placeholder="Create a new task...">
            </section>
            <section id="tasks">
                <ul id="task_list">
                    
                </ul>
                <section id="tasks_footer">
                    <div class="grid_background0"></div> <!--empty div for grid styling !-->
                    <p id="tasks_left" class="upper_footer">No tasks remaining</p>
                    <div class="grid_background1"></div> <!--empty divs for grid styling -->
                    <div id="task_display_toggle">
                        <button id='active_display' class="display_toggle_button">All</button>
                        <button  class="display_toggle_button">Active</button>
                        <button class="display_toggle_button">Completed</button>
                    </div>
                    <div class="grid_background2"></div> <!--empty divs for grid styling -->
                    <button id="clear_completed" class="upper_footer">Clear Completed</button>
                </section>
            </section>
            <p id="bottom_text">Drag and drop to reorder list</p>
        </section>
        
    </main>
    <script src="../Script/script.js"></script>
</body>
</html>