import express from 'express';
const app = express();
app.use(express.json());
const students = [
    {
        id:1,
        name:"Mahak Kaushal",
        age : 20
    },
    {
        id:2,
        name:"Rohit Randhawa",
        age:25
    },
    {
        id:3,
        name:"Raghav Chaddha",
        age:25
    }
]
app.get('/',(req,res)=>{
    res.send("Connection established successfully!!");
})

app.get('/students/:id',(req,res)=>{
    const studentId = Number(req.params.id);
    const student = students.find(student => student.id === studentId);
    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
});

app.post("/students",(req,res)=>{
    const {id,name,age} = req.body;
    if(!id||!name||!age){
        return res.status(400).json({
            message:"All Fields Are Required"
        });
    }
    const newStudent = {
        id,
        name,
        age
    };

    students.push(newStudent);
    res.status(201).json({
        message:"Student Added Successfully",
        students:newStudent
    });
})

app.get('/allstudents',(req,res)=>{
    res.json(students);
})
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})