const Todo = require('../models/Todo');

exports.updateTodo = async(req,res) => {
    try{
        const {id} = req.params;
        const {title,description} = req.body;

        const todo = await Todo.findByIdAndUpdate(
            {_id:id},
            {title,description,updatedAt:Date.now()},
        )
        res.status(200).json(
            {
                success:true,
                data:todo,
                message:"Updated Successfully"
            }
        );
    }
    catch(error){
        console.error(error),
        console.log(error),
        res.status(500).json(
        {
            success:false,
            data:"Server error",
            message:error.message,
        }
        )
    }
}
