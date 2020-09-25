<template>
	<el-form class="container" 
	:rules="rules"
	:model="adminForm"
	ref="adminForm"
	>
		<h3>后台管理系统</h3>
		<el-form-item prop="adminName">
		    <el-input placeholder="请输入账号"
			v-model="adminForm.adminName"
			></el-input>
		</el-form-item>
		<el-form-item prop="passWord">
		    <el-input placeholder="请输入密码" type="password"
			v-model="adminForm.passWord"
			></el-input>
		</el-form-item>
		<el-form-item>
		    <el-button style="width: 100%;" type="success" plain
			:loading="$store.state.isLoading"
			@click="login"
			>登陆</el-button>
		</el-form-item>
	</el-form>
</template> 

<script>
	export default{
		name:"Login",
		data(){
			return{
				adminForm:{
					adminName:"",
					passWord:""
				},
				rules:{
					adminName: [
				        { required: true, message: '请输入正确的账号', trigger: 'blur' },
				        { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
				    ],
				    passWord: [
				        { required: true, message: '请输入正确的密码', trigger: 'blur' },
				        { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
				    ]
				 },
			}
		},
		methods:{
			login(){
				this.$refs.adminForm.validate(valid=>{
                    if(valid){// 规则验证成功
						//login为store/admin/index.js中封装的函数
                        this.$store.dispatch("login",this);
                    }else{// 规则验证失败。
                        this.$message.error('请输入完整的信息');
                    }
                })
			}
		}
	}
</script>

<style scoped lang="less">
	.container{
		border: 1px solid #3f81ea;
		box-shadow: 10px 10px 10px 10px #3f81ea ;
		margin: 150px auto;
		width: 350px;
		padding: 10px 20px;
		h3{
			text-align: center;
			margin-bottom: 15px;
		}
	}
</style>