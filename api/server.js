const express = require("express");
const bodyParser = require("body-parser");
const db = require("./module/db");
const md5 = require("md5");
const tools = require("./module/tools");
const upPic = require("./module/upPic")
const mongodb = require("mongodb")

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname+"/upload"));

//登录接口 
app.post("/login",async (req,res)=>{
	try{
		// 接收账号和密码
	    const {adminName,passWord} = req.body;
	    // 根据账号与密码查找管理员
	    const info = await db.findOne("adminList",{
	        adminName,
	        passWord:md5(passWord+"wzt")
	    })
	    // 插入数据
	    await db.insertOne("adminLog",{
	        adminName,
	        logType:(info?1:2),
	        detail:"登陆信息："+(info?"成功":"失败"),
	        addTime:Date.now()
	    })
	    // 返回结果
	    if(info){
	        // 更新管理员最后登陆的时间。
			await db.updateOne("adminList",{_id:info._id},{$set:{loginTime:Date.now()}})
	        res.json({
	            ok:1,
				msg:"登陆成功",
	            token:tools.encode({adminName})
	        })
	        }else{
	            tools.json(res,-1,"账号或密码错误");
	        }
	    }
	    catch (err) {
	        tools.json(res,-1,err);
	    }
})
// 除了登陆以外，都会执行该路由。如果token没问题，继续向下匹配。
app.all("*",(req,res,next)=>{
    const token = req.headers.authorization;
    const {ok,msg,info} = tools.decode(token);
    if(ok === 3) next();
    else{
        tools.json(res,2,msg);
    }
})
//获取管理员日志接口
app.get("/adminLog",async (req,res)=>{
    //获得指定页数的信息
    let pageIndex = req.query.pageIndex/1;
	const response = await db.page("adminLog",{
		sort:{
			addTime:-1,
		},
		pageIndex
	})
	res.json(response)
})
//管理员账号信息
app.get("/adminList",async (req,res)=>{
    //获得指定页数的信息
    let pageIndex = req.query.pageIndex/1;
    const response = await db.page("adminList",{
        sort:{
            addTime:-1,
            },
            limit:5,
            pageIndex
        })
        res.json(response);
})
// 根据Id删除日志。
app.delete("/adminLog/:id",async (req,res)=>{
    try{
        const id = req.params.id;
        await db.deleteOneById("adminLog",id);
        tools.json(res,1,"删除成功")
    }catch (e) {
        tools.json(res,-1,"删除成败")
    }
});
//提交店铺类别列表
app.post("/shopTypeList",(req,res)=>{
	upPic(req,"shopTypePic",async ({ok,msg,params}) =>{
		if(ok === 1 ){
	        await db.insertOne("shopTypeList",{
	            shopTypeName:params.shopTypeName,
	            shopTypePic:params.newPicName,
	            addTime:Date.now()
	        })
	        tools.json(res,1,"上传成功");
	    }else{
	        tools.json(res,-1,msg);
	    }
	})
})
//获取店铺类别列表
app.get("/shopTypeList",async (req,res)=>{
    const pageIndex = req.query.pageIndex;
	const keyWord = req.query.keyWord || null;
	let whereObj = {};
	if(keyWord){
	    whereObj={
	        shopTypeName:new RegExp(keyWord)
	    }
    }
    const response = await db.page("shopTypeList",{
        pageIndex,
		whereObj,
        sort:{
            addTime:-1
        },
		limit:5,
    })
    res.json(response);
})
// 修改店铺类别
app.put("/shopTypeList",(req,res)=>{
    upPic(req,"shopTypePic",async  ({ok,msg,params}) => {
        if(ok === 3){
            tools.json(res,-1,msg);
        }else{
            const upObj = {
                $set:{
                    shopTypeName:params.shopTypeName
                }
            }
            // 如果成功上传了图片
            if(ok === 1){
                const shopTypeInfo = await db.findOneById("shopTypeList",params.shopTypeId);
				// 删除
                const result = await tools.deletePic(shopTypeInfo.shopTypePic);
                upObj.$set.shopTypePic = params.newPicName;
            }
            // 直接修改
            await db.updateOneById("shopTypeList",params.shopTypeId,upObj);
            tools.json(res,1,"修改成功")
        }
    })
})
// 获得所有店铺类别
app.get("/allShopTypeList",async (req,res)=>{
    const shopTypeList = await db.find("shopTypeList",{
        sort:{
            addTime:-1
        }
    });
    res.json({
        ok:1,
        shopTypeList
    })
})
// 添加店铺
app.post("/shopList",(req,res)=>{
	upPic(req,"shopPic",async ({ok,msg,params}) =>{
		if(ok === 1 ){
			//根据店铺类别id获取店铺类别信息
			const shopTypeInfo = await db.findOneById("shopTypeList",params.shopTypeId) 
	        await db.insertOne("shopList",{
				shopTypeId:shopTypeInfo._id,
				shopName:params.shopName,
				shopTypeName:shopTypeInfo.shopTypeName,
				shopPic:params.newPicName,
	            addTime:Date.now()
	        })
	        tools.json(res,1,"上传成功");
	    }else{
	        tools.json(res,-1,msg);
	    }
	})
})

app.get("/shopList",async (req,res)=>{
	let pageIndex = req.query.pageIndex/1;
	const response = await db.page("shopList",{
		sort:{
			addTime:-1,
		},
		limit:5,
		pageIndex
	})
	res.json(response)
})

app.get("/shopInfo/:id",async (req,res) =>{
	const shopInfo = await db.findOneById("shopList",req.params.id)
	res.json({
		ok:1,
		shopInfo
	})
})

// app.put("/shopList",(req,res)=>{
//     upPic(req,"shopPic",async  ({ok,msg,params}) => {
//         if(ok === 3){
//             tools.json(res,-1,msg);
//         }else{
//             const upObj = {
//                 $set:{
//                     shopName:params.shopName,
//                 }
//             }
//             // 如果成功上传了图片
//             if(ok === 1){
//                 const shopInfo = await db.findOneById("shopList",params.shopTypeId);
// 				// 删除
//                 const result = await tools.deletePic(shopInfo.shopPic);
//                 upObj.$set.shopPic = params.newPicName;
//             }
// 			console.log(params.shopTypeId)
//             // 直接修改
//             await db.updateOneById("shopList",params.shopTypeId,upObj);
//             tools.json(res,1,"修改成功")
//         }
//     })
// })
//根据店铺类别id获取店铺信息
app.get("/shopList/:shopTypeId",async (req,res) =>{
	const shopList = await db.find("shopList",{
		whereObj:{
			shopTypeId:mongodb.ObjectId(req.params.shopTypeId)
		}
	})
	res.json({
		ok:1,
		shopList
	})
})

//添加商品类别
app.post("/goodsTypeList",async (req,res) =>{
	// 根据店铺的ID获得店铺信息
	const shopInfo = await db.findOneById("shopList",req.body.shopId);
	// 根据店铺类别ID，获得店铺类别信息。
	// const shopTypeInfo = await db.findOneById("shopTypeList",req.body.shopTypeId)
	await db.insertOne("goodsTypeList",{
	    goodsTypeName:req.body.goodsTypeName,
	    shopId:shopInfo._id,
	    shopName:shopInfo.shopName,
	    shopTypeId:shopInfo.shopTypeId,
	    shopTypeName:shopInfo.shopTypeName,
	    addTime:Date.now()
	})
	res.json({
	    ok:1,
	    msg:"插入成功"
	})
})
//获取商品类别
app.get("/goodsTypeList",async (req,res) =>{
	const pageIndex = req.query.pageIndex;
	const response = await db.page("goodsTypeList",{
	    pageIndex,
	    sort:{
	        addTime:-1
	    },
	    limit:5
	})
	res.json(response);
});


app.listen(80,function(){
	console.log("success")
})