const Todo = require('../models/Todo');

exports.deleteTodo = async(req,res) => {
    try{
        const {id} = req.params;

        await Todo.findByIdAndDelete(id);
        res.status(200).json(
            {
                success:true,
                message:"Deleted Successfully"
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
