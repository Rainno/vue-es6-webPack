/**
 * Created by Rainno on 2017/7/31.
 */

let vue = new Vue({
   el:".container",
    mounted(){
        this.$nextTick(function(){
            this.addressView();
        })
    },
    data:{
        addressList: [],
        shippingMethod: 1,
        limitNum: 3,
        currentIndex: 0,
        curDel:'',
        delFlag: false
    },
    methods:{
        addressView: function(){
         this.$http.get("data/address.json",{"id":123}).then((res)=>{
           if(res.data.status=='0'){
               this.addressList = res.data.result;
           }
         })
        },
        setDefault: function(addressId){
            this.addressList.forEach((address,index)=>{
                if(address.addressId== addressId){
                    address.isDefault= true;
                }else{
                    address.isDefault= false;
                }
            })
        },
        delAddress: function(item){
            this.delFlag= true;
            this.curDel = item;//存储要删除的地址
        },
        delConfirm: function(){
            let index=this.addressList.indexOf(this.curDel);
            this.addressList.splice(index,1);
            this.delFlag= false;
        }
    },
    computed:{//实时的计算
        filterAddress: function(){
            return this.addressList.slice(0,this.limitNum);//限制地址在页面显示的个数
        }
    }
});