const Todo = require('../models/Todo');

exports.getTodo = async(req,res) => {
    try{
        const todos = await Todo.find({});
        res.status(200).json(
            {
                success:true,
                data:todos,
                message:"Entire Data Retrieved Successfully"
            }
        );
    }
    catch(error){
        console.error(error),
        console.log(error),
        res.status(500).json(
        {
            success:false,
            data:"internal server error",
            message:error.message,
        }
        )
    }
}

exports.getTodoById = async(req,res) => {
    try{
        const id = req.params.id;
        const todo = await Todo.findById({_id: id});

        if(!todo){
            return res.status(404).json({
                success:false,
                message:"No Data Found with Given Id"
            })
        }
        else{
            return res.status(200).json({
                success:true,
                data:todo,
                message:`Todo ${id} data Successfully fetched`
            })
        }
    }
    catch(error){
        console.error(error),
        console.log(error),
        res.status(500).json(
        {
            success:false,
            error:error.message,
            message:"Server error",
        }
        )
    }
}