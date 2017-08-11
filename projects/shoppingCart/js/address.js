"use strict";

/**
 * Created by Rainno on 2017/7/31.
 */

var vue = new Vue({
    el: ".container",
    mounted: function mounted() {
        this.$nextTick(function () {
            this.addressView();
        });
    },

    data: {
        addressList: [],
        shippingMethod: 1,
        limitNum: 3,
        currentIndex: 0,
        curDel: '',
        delFlag: false
    },
    methods: {
        addressView: function addressView() {
            var _this = this;

            this.$http.get("data/address.json", { "id": 123 }).then(function (res) {
                if (res.data.status == '0') {
                    _this.addressList = res.data.result;
                }
            });
        },
        setDefault: function setDefault(addressId) {
            this.addressList.forEach(function (address, index) {
                if (address.addressId == addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            });
        },
        delAddress: function delAddress(item) {
            this.delFlag = true;
            this.curDel = item; //存储要删除的地址
        },
        delConfirm: function delConfirm() {
            var index = this.addressList.indexOf(this.curDel);
            this.addressList.splice(index, 1);
            this.delFlag = false;
        }
    },
    computed: { //实时的计算
        filterAddress: function filterAddress() {
            return this.addressList.slice(0, this.limitNum); //限制地址在页面显示的个数
        }
    }
});