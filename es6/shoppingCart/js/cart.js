/**
 * Created by Rainno on 2017/7/31.
 */
let vue = new Vue({
    el:".checkout",
    mounted: function(){//相当于ready
        this.$nextTick(function(){//保证所有的都插入了文档，使this等同于vue的实力化
            this.cartView();
        })

    },
    data:{//可以称作模型
        totalMoney: 0,
        productList: [],
        checkAll: false,
        totalPrice: 0,
        delFlag: false,
        curProduct: 0
    },
    methods:{
        cartView: function(){
            //let _this = this;
            this.$http.get("./data/cartData.json",{"id": 123}).then((res)=>{//箭头函数里面的this指向了箭头函数的外面，即不需要定义let _this = this
                this.productList = res.data.result.list;
                //this.totalMoney = res.data.result.totalMoney;
            });
        },
        changeMoney: function(product,way){
            if(way>0){
                product.productQuantity++
            }else{
                product.productQuantity--;
                if(product.productQuantity<1){
                    product.productQuantity =1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct: function(item){
            if(typeof item.checked === 'undefined'){//用vue.js去监听一个不存在的变量
                //vue.set(item,"checked",true);//全局注册
                this.$set(item,"checked",true);//局部注册
            }else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        selectedAll: function(flag){
            this.checkAll = flag;
            this.productList.forEach((item,index)=>{
                if(typeof item.checked === 'undefined'){//用vue.js去监听一个不存在的变量
                    //vue.set(item,"checked",true);//全局注册
                    this.$set(item,"checked",this.checkAll);//局部注册
                }else{
                    item.checked = this.checkAll;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function(){
            this.totalPrice= 0;
            this.productList.forEach((item,index)=>{
                if(item.checked){
                    this.totalPrice += item.productPrice*item.productQuantity;
                }
            })
        },
        delConfirm: function(item){
            this.delFlag= true;
            this.curProduct = item;//存储要删除的商品
        },
        delProduct: function(){
            let index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag= false;
        }

    },
    filters:{//局部过滤器--只用当前的vue实例才可以使用
        formatMoney: function(value){
            return "￥" + value.toFixed(2) +'元';//保留两位小数
        }
    }
});