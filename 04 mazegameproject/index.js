const {Engine, Runner, Bodies,World,Render, Body, Events}=Matter;

const width=window.innerWidth;
const height=window.innerHeight;
const cellsHorizontal=4;
const cellsVertical=3;
const velocity=2;
const unitLengthx= width/cellsHorizontal;
const unitLengthy= height/cellsVertical;
const engine=Engine.create();
engine.world.gravity.y=0;
const {world}=engine;
const render =Render.create({
    element:document.body,
    engine:engine,
    options:{
        wireframes:false,
        width,
        height
    }
    
    
});

Render.run(render);
Runner.run(Runner.create(),engine);


//walls
const shape=[
    Bodies.rectangle(width/2,0,width,2,{
    isStatic:true}),
    Bodies.rectangle(width/2,height,width,2,{
        isStatic:true
    }),
    Bodies.rectangle(0,height/2,2,height,{
        isStatic:true
    }),
    Bodies.rectangle(width,height/2,2,height,{
        isStatic:true
    })
];

World.add(world, shape);


const makeArray=(row, col, value)=>{
    return Array(row).fill(null).map(()=>Array(col).fill(value));
}

//Maze Generation

const shufflingArray=(arry)=>{
    let counter = arry.length;
    while(counter >0){
        const index = Math.floor(Math.random() * counter);
        
        counter--;
        let temp= arry[index];
        arry[index]=arry[counter];
        arry[counter]=temp;
       
    }
    return arry;
}
const grid=Array(cellsVertical)
.fill(null)
.map(()=>Array(cellsHorizontal).fill(false));
const verticals= Array(cellsVertical).fill(null).map(()=>Array(cellsHorizontal-1).fill(false));
const horizontals=Array(cellsVertical-1).fill(null).map(()=>Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);


const stepThroughCells=(row , column)=>{
    // if visit the cell then return
    if(grid[row][column]){
        return;
    }

    // Mark the cell is as beging visited
        grid[row][column]=true;

    //Assemble rondomly-order list of neighbors
    const neighbors=shufflingArray([
        [row-1, column, 'up'],
        [row, column+1, 'right'],
        [row, column-1 ,'left'],
        [row+1, column, 'down']
    ]);
   
  //for each neighbor ....
    for (let neighbor of neighbors){
        // checking the out of boundry
            const [ nextRow, nextCol, directions]=neighbor;
            if(nextRow < 0 || nextRow >=cellsVertical || nextCol < 0 || nextCol >=cellsHorizontal){
                continue;
            }
        // if we visited the Neighbor then continue;
            if(grid[nextRow][nextCol]){
                continue;
            }
        // Remove the wall from Horizontals or verticals
        // for vertical wall
        if(directions==='left'){
            verticals[row][column-1]=true;
        }else if(directions==='right'){
            verticals[row][column]=true;
        }else if(directions==='up'){
            horizontals[row-1][column]=true;
        }else if(directions==='down'){
            horizontals[row][column]=true;
        }

        stepThroughCells(nextRow,nextCol);
    }

}

stepThroughCells(startRow,startColumn);

horizontals.forEach((row, rowIndex)=>{
    row.forEach((open, colIndex)=>{
        if(open){
            return;
        }
      
        const wall = Bodies.rectangle(
            colIndex * unitLengthx + unitLengthx / 2 , rowIndex * unitLengthy +unitLengthy, unitLengthx,5,{
                isStatic:true,
                label:'wall',
                render:{
                    fillStyle:'red'
                }
            }
        );
        World.add(world, wall)
    });
});

verticals.forEach((row, rowIndex)=>{
    row.forEach((open, colIndex)=>{
        if(open){
            return;
        }
      //  console.log(colIndex * unitLength + unitLength / 2)
        const wall = Bodies.rectangle(
            colIndex * unitLengthx + unitLengthx  , rowIndex * unitLengthy +unitLengthy/2, 5,unitLengthy,{
                isStatic:true,
                label:'wall',
               render:{
                   fillStyle:'red'
               }
            }
        );
        World.add(world, wall)
    });
});


// goal 
const goal = Bodies.rectangle(
    width - unitLengthx/2 , 
    height - unitLengthy/2, 
    unitLengthx * .7,
    unitLengthy * .7,
    {
        isStatic:true,
        label:'goal',
        render:{
            fillStyle:'green'
        }
    });
World.add(world, goal);

// Ball
const ballRadius=Math.min(unitLengthx, unitLengthy)/4;
const ball = Bodies.circle(unitLengthx/2 , unitLengthy/2 , ballRadius,{
    label:'ball',
    render:{
        fillStyle:'blue',
        
    }
});
World.add(world, ball)

document.addEventListener('keydown', event=>{
    const {x , y}= ball.velocity;
  //  console.log(x , y)
    if(event.keyCode=== 87){
        Body.setVelocity(ball, {x, y: y-velocity});
     //   console.log("Ball move Up");
    }else if(event.keyCode=== 68){
        Body.setVelocity(ball, {x:x+velocity, y});
     //   console.log("Ball move right");
    }else if(event.keyCode=== 65){
        Body.setVelocity(ball, {x:x-velocity, y});
     //   console.log("Ball move left");
    }else if(event.keyCode=== 83){
        Body.setVelocity(ball, {x, y: y+velocity});
     //   console.log("Ball move down");
    }
});

// Win the game
Events.on(engine, 'collisionStart', event=>{
    event.pairs.forEach((collisions)=>{
        const labels=['ball','goal'];
        if(labels.includes(collisions.bodyA.label) && labels.includes(collisions.bodyB.label)){
            world.gravity.y=1;
            world.bodies.forEach((body)=>{
               if( body.label==="wall"){
                   Body.setStatic(body, false)
               }
            });
            document.querySelector(".winner").classList.remove('hidden')
        }
    });
});