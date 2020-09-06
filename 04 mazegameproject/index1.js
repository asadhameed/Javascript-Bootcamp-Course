const {Engine, Runner, Bodies,World,Render,MouseConstraint, Mouse}=Matter;

const width=800;
const height=600;
const engine=Engine.create();
const {world}=engine;
const render =Render.create({
    element:document.body,
    engine:engine,
    options:{
       // wireframes:false,
        width,
        height
    }
    
    
});

Render.run(render);
Runner.run(Runner.create(),engine);

World.add(world,MouseConstraint.create(engine,{
    mouse:Mouse.create(render.canvas)
}))

//walls
const shape=[
    Bodies.rectangle(400,0,800,40,{
    isStatic:true}),
    Bodies.rectangle(400,600,800,40,{
        isStatic:true
    }),
    Bodies.rectangle(0,300,40,600,{
        isStatic:true
    }),
    Bodies.rectangle(800,300,40,600,{
        isStatic:true
    })
];

World.add(world, shape);

//Random shapes
// for(let i=0; i<20;i++){
//     if(Math.random() > 0.5){
//         World.add(world, Bodies.rectangle(Math.random() * width,Math.random() * height,50,50));
//     }
//     else{
        
//         World.add(world, Bodies.circle(
//             Math.random() * width,Math.random() * height,30,
//         {
//             render:{
//                 fillStyle:'red'
//             }
//         }));
//         World.add(world, Bodies.polygon(Math.random() * width,Math.random() * height,6,30));
//     }
// }

for(let j =60; j <width; j+=76){
    console.log(j)
   
    World.add(world, Bodies.rectangle( j,60,76,76,{
        isStatic:true
    }));

}