export default{
	state:{
		dialogName:'',
		dialogform:{
			userName:'',
			account:'',
			password:'',
			confirmPassword:'',
			type:'',
		},

	},
	getters:{

	}
	mutations:{
		changeDialogName(state,newName){
			state.dialogName=newName
		}
	}
}