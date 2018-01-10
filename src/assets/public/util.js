export default {
	methods:{
		getDate(timeSteam){
            let time=new Date(timeSteam)
            let year=time.getFullYear()
            let month=time.getMonth()+1
            let day=time.getDate()
            let hour=time.getHours()
            let minutes=time.getMinutes()
            let seconds=time.getSeconds()
            hour=hour>=10?hour:'0'+hour
            minutes=minutes>=10?minutes:'0'+minutes
            seconds=seconds>=10?seconds:'0'+seconds
            return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds
        }
	}
}