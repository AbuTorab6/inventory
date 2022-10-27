var express=require('express');
var app = express();
var router = express.Router();
app.use(express.json());
var jwt= require('jsonwebtoken');
const { get } = require('mongoose');
var mongoose = require('mongoose')

var productModel = require('../models/productModel');
var purchaseDetailModel = require('../models/purchaseDetailModel')
var sellDetailModel = require('../models/sellDetailModel')
var returnDetailModel = require('../models/returnDetailModel')


var createProduct = async (req,res)=>
{
    var dataFromPostman = req.body;
    var tokenFromPostman = req.headers.authorization;
    if(tokenFromPostman=='')
    {
        res.status(203);
        res.send("Token is required")
    }
    else
    {
        try
        {
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);

            var ob = new productModel({
                userEmail:dataFromToken.email,
                categoryId:dataFromPostman.categoryId,
                brandId:dataFromPostman.brandId,
                name:dataFromPostman.name,
                unit:dataFromPostman.unit,
                details:dataFromPostman.details
            });

            await ob.save();

            res.status(200);
            res.send("product insert success")
        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}




var updateProduct = async (req,res)=>
{

    var dataFromPostman = req.body;
    var myId = req.params.id;
    var tokenFromPostman = req.headers.authorization;

    if(tokenFromPostman=='')
    {
        res.status(203);
        res.send("Token is required")
    }
    else
    {
        try
        {
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);
            var data = await productModel.updateOne({_id:myId,userEmail:dataFromToken.email},{$set:{name:dataFromPostman.name,unit:dataFromPostman.unit,details:dataFromPostman.details}})
            if(data.modifiedCount==0)
            {
                res.status(203);
                res.send("can not update product")
            }
            else
            {
                res.status(200);
                res.send("product updated")
            }

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}

var productList = async(req,res)=>
{
    var myPageNo = Number(req.params.pageNo);
    var myPerPage = Number(req.params.perPage);
    var mySearchKey = req.params.searchKey;
    var skipData = (myPageNo-1)*myPerPage;

    var tokenFromPostman = req.headers.authorization;

    if(tokenFromPostman=='')
    {
        res.status(203);
        res.send("Token is required")
    }
    else
    {
        try
        {
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);

            if(mySearchKey==="0")
            {
                var data = await productModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$lookup:{from:'categories',localField:'categoryId',foreignField:'_id',as:'categoryDetail'}},
                    {$lookup:{from:'brands',localField:'brandId',foreignField:'_id',as:'brandDetail'}},
                    {
                        $facet :{
                                    "totalData":[{$count:'total'}],
                                    "allData":[{$skip:skipData},{$limit:myPerPage}]
                                }
                    }
                ])
            }
            else
            {
                var data = await productModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$lookup:{from:'categories',localField:'categoryId',foreignField:'_id',as:'categoryDetail'}},
                    {$lookup:{from:'brands',localField:'brandId',foreignField:'_id',as:'brandDetail'}},
                    {
                        $facet : {
                            "totalData":[
                                        {
                                            $match:{$or:
                                                        [
                                                        {name:{$regex:mySearchKey,$options:"i"}},
                                                        {unit:{$regex:mySearchKey,$options:"i"}},
                                                        {details:{$regex:mySearchKey,$options:"i"}},
                                                        {'categoryDetail.name':{$regex:mySearchKey,$options:"i"}},
                                                        {'brandDetail.name':{$regex:mySearchKey,$options:"i"}}
                                                        ]
                                                    }
                                        },
                                        {$count:'total'}
                                    ],
                            "allData":[
                                        {
                                            $match:{$or:
                                                        [
                                                        {name:{$regex:mySearchKey,$options:"i"}},
                                                        {unit:{$regex:mySearchKey,$options:"i"}},
                                                        {details:{$regex:mySearchKey,$options:"i"}},
                                                        {'categoryDetail.name':{$regex:mySearchKey,$options:"i"}},
                                                        {'brandDetail.name':{$regex:mySearchKey,$options:"i"}}
                                                        ]
                                                    }
                                        },
                                        {$skip:skipData},
                                        {$limit:myPerPage}
                                        
                                    ]
                            
                        }
                    }
                ])
            
                
            }

            res.status(200);
            res.send(data);

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }

}


var deleteProduct = async(req,res)=>
{
    var tokenFromPostman = req.headers.authorization;
    var myId = req.params.id;

    if(tokenFromPostman=='')
    {
        res.status(203);
        res.send("Token is required")
    }
    else
    {
        try
        {
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);

            var checkAssociation1 = await purchaseDetailModel.find({productId:myId})
            var checkAssociation2 = await sellDetailModel.find({productId:myId})
            var checkAssociation3 = await returnDetailModel.find({productId:myId})

            if(checkAssociation1.length!==0)
            {
                res.status(206);
                res.send("you can not delete this product. This product's record is already exist on purchaseDetail collection !");
            }
            else if(checkAssociation2.length!==0)
            {
                res.status(206);
                res.send("you can not delete this product. This product's record is already exist on sellDetail collection !");
            }
            else if(checkAssociation3.length!==0)
            {
                res.status(206);
                res.send("you can not delete this product. This product's record is already exist on returnDetail collection !");
            }
            else
            {
                await productModel.deleteMany({_id:myId})
                res.status(200);
                res.send("product is deleted")
            }

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}




var productDetailById = async (req,res)=>
{
    var tokenFromPostman = req.headers.authorization;
    var myId = req.params.id;
    

    if(tokenFromPostman=='')
    {
        res.status(203);
        res.send("Token is required")
    }
    else
    {
        try
        {
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);

            var data = await productModel.aggregate([
                {$match:{userEmail:{$eq:dataFromToken.email}}},
                {$match:{_id:{$eq:mongoose.Types.ObjectId(myId)}}}
            ])
            res.status(200);
            res.send(data);

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }

}








router.route('/createProduct')
    .post(createProduct)
router.route('/updateProduct/:id')
    .post(updateProduct)
router.route('/productList/:pageNo/:perPage/:searchKey')
    .get(productList)
router.route('/deleteProduct/:id')
    .get(deleteProduct)
router.route('/productDetailById/:id')
    .get(productDetailById)

module.exports=router;