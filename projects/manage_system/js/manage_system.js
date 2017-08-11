'use strict';

var vue = new Vue({
    el: '#project',
    data: {
        detail: [{
            task_title: '任务1',
            create_time: '2017-07-01',
            sender: 'xx10',
            executor: 'xx11',
            operations: [{
                edit: '编辑',
                check: '查看',
                delete: '删除'
            }]
        }, {
            task_title: '任务3',
            create_time: '2017-07-03',
            sender: 'xx30',
            executor: 'xx31',
            operations: [{
                edit: '编辑',
                check: '查看',
                delete: '删除'
            }]
        }, {
            task_title: '任务5',
            create_time: '2017-07-05',
            sender: 'xx50',
            executor: 'xx51',
            operations: [{
                edit: '编辑',
                check: '查看',
                delete: '删除'
            }]
        }, {
            task_title: '任务4',
            create_time: '2017-07-04',
            sender: 'xx40',
            executor: 'xx41',
            operations: [{
                edit: '编辑',
                check: '查看',
                delete: '删除'
            }]
        }, {
            task_title: '任务2',
            create_time: '2017-07-02',
            sender: 'xx20',
            executor: 'xx21',
            operations: [{
                edit: '编辑',
                check: '查看',
                delete: '删除'
            }]
        }],
        detail_copy: [{
            task_title: '任务1',
            create_time: '2017-07-01',
            sender: 'xx10',
            executor: 'xx11',
            operations: [{
                edit: '编辑',
                check: '查看',
                delete: '删除'
            }]
        }, {
            task_title: '任务3',
            create_time: '2017-07-03',
            sender: 'xx30',
            executor: 'xx31',
            operations: [{
                edit: '编辑',
                check: '查看',
                delete: '删除'
            }]
        }, {
            task_title: '任务5',
            create_time: '2017-07-05',
            sender: 'xx50',
            executor: 'xx51',
            operations: [{
                edit: '编辑',
                check: '查看',
                delete: '删除'
            }]
        }, {
            task_title: '任务4',
            create_time: '2017-07-04',
            sender: 'xx40',
            executor: 'xx41',
            operations: [{
                edit: '编辑',
                check: '查看',
                delete: '删除'
            }]
        }, {
            task_title: '任务2',
            create_time: '2017-07-02',
            sender: 'xx20',
            executor: 'xx21',
            operations: [{
                edit: '编辑',
                check: '查看',
                delete: '删除'
            }]
        }],
        curIndex: null,
        isRowStyle: false,
        isShowSearchBox: false,
        isTitle: false,
        isTime: false,
        isSender: false,
        isExecutor: false,
        deleteFlag: false,
        deleteMsg: [],
        checkFlag: false,
        checkMsg: [],
        curMsg: {},
        checkInfo: false,
        editInfo: false,
        addFlag: false,
        flag: false,
        saveMsg: [],
        mentionFlag: false,
        curAddress: '',
        searchInfo: '',
        saveInfo: '',
        isShowChoose: false,
        saveDetail: [],
        options: [{ value: '0', text: '按时间的升序排序' }, { value: '1', text: '按时间的降序排序' }],
        detailItem: {
            'task_title': '',
            'create_time': '',
            'sender': '',
            'executor': '',
            'operations': [{
                'edit': '编辑',
                'check': '查看',
                'delete': '删除'
            }]
        }

    },
    mounted: function mounted() {
        // this.saveDetail=JSON.parse(JSON.stringify(this.detail));
    },
    filters: {},
    computed: {
        detailData: function detailData() {
            var search = this.searchInfo;
            if (search) {
                return this.detail.filter(function (product) {
                    /*Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in
                     循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。*/
                    //some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
                    return Object.keys(product).some(function (key) {
                        //console.log(product[key]);
                        //console.log(String(product[key]).toLowerCase().indexOf(search));
                        return String(product[key]).toLowerCase().indexOf(search) > -1;
                    });
                });
            }
            return this.detail;
        },
        specifyDetail: function specifyDetail() {
            var _this = this;

            var search = this.searchInfo;
            var showSearch = '';
            this.detail = JSON.parse(JSON.stringify(this.detail_copy));
            if (search) {
                return this.detail.filter(function (value) {
                    //value是一个对象
                    return Object.keys(value).some(function (key) {
                        var index = String(value[key]).toLowerCase().indexOf(search);
                        if (index > -1) {
                            showSearch = _this.detail[index];
                            return showSearch;
                        }
                        //return showSearch;为什么这里不可以
                    });
                });
            } else {
                return this.detail;
            }
        }
    },
    methods: {
        selectItem: function selectItem(item) {
            this.curIndex = this.detail.indexOf(item);
        },
        search: function search() {
            //this.detail = (this.detail_copy);
            if (this.searchInfo !== '') {
                this.detail = JSON.parse(JSON.stringify(this.specifyDetail));
            }

            //this.detail=this.saveDetail;

            //this.saveInfo=JSON.parse(JSON.stringify(this.searchInfo));
            if (this.isTitle === true || this.isTime === true || this.isSender === true || this.isExecutor === true) {
                this.isTitle = false;
                this.isTime = false;
                this.isSender = false;
                this.isExecutor = false;
            }
            if (this.searchInfo) {
                if (!isNaN(parseInt(this.searchInfo))) {
                    //是数字

                    for (var i in this.detail) {
                        if (this.detail[i].create_time === this.searchInfo) {
                            return this.detail.filter(function (item) {});
                        }
                        if (this.detail[i].create_time.indexOf(this.searchInfo) >= 0) {
                            this.isTime = true;
                        }
                        if (this.detail[i].task_title.indexOf(this.searchInfo) >= 0) {
                            this.isTitle = true;
                        }
                    }
                } else {
                    for (var _i in this.detail) {
                        //非数字
                        if (this.detail[_i].task_title.indexOf(this.searchInfo) >= 0) {
                            //console.log(this.detail[i].task_title);
                            this.isTitle = true;
                        }
                        if (this.detail[_i].executor.indexOf(this.searchInfo) >= 0) {
                            this.isExecutor = true;
                        }
                        if (this.detail[_i].sender.indexOf(this.searchInfo) >= 0) {
                            this.isSender = true;
                        }
                    }
                }
            } else {
                alert('请输入筛选内容');
            }
            this.searchInfo = '';
        },
        keyUp_search: function keyUp_search() {
            if (this.searchInfo === '') {
                this.isShowSearchBox = false;
            } else {
                this.isShowSearchBox = true;
            }
        },
        choose: function choose(option) {
            if (option.value === '0') {
                this.ascendingSortByTime();
            } else {
                this.descendingSortByTime();
            }
        },

        /*sortBy:function (name) {
                return function(o, p){
                    let a, b;
                    if (typeof o === "object" && typeof p === "object" && o && p) {
                        a = o[name];
                        b = p[name];
                        if (a === b) {
                            return 0;
                        }
                        if (typeof a === typeof b) {
                            return a < b ? -1 : 1;
                        }
                        return typeof a < typeof b ? -1 : 1;
                    }
                    else {
                        throw ("error");
                    }
                }
        },*/
        ascendingSortByTime: function ascendingSortByTime() {
            this.sortByTime(1);
            this.isShowChoose = false;
        },
        descendingSortByTime: function descendingSortByTime() {
            this.sortByTime(-1);
            this.isShowChoose = false;
        },
        sortByTime: function sortByTime(flag) {
            var _this2 = this;

            var saveTime = [];
            var date = new Date();
            for (var i in this.detail) {
                var time = this.detail[i].create_time.split('-'); //取出时间
                saveTime.push(date.setFullYear(time[0], time[1] - 1, time[2])); //时间转换成秒
            }
            saveTime.forEach(function (value, index) {
                _this2.detail[index].create_time = value;
            });
            //时间排序
            this.detail.sort(function (a, b) {
                return flag === 1 ? a.create_time - b.create_time : b.create_time - a.create_time;
            });

            //将时间转换成开始的格式
            for (var j = 0; j < this.detail.length; j++) {
                date.setTime(this.detail[j].create_time);
                this.detail[j].create_time = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0'); //数组
            }
            //this.detail.sort(this.sortBy("task_title"));
        },
        /* ascendingSortByTitle:function () {
             this.sortByTitle(1);
         },
         descendingSortByTitle:function () {
             this.sortByTitle(-1);
         },*/
        /*sortByTitle:function (flag) {
            let saveTitle=[];
            for(let i in this.detail){
               //let code=encodeURI(this.detail[i].task_title);
                console.log(i);
                let code=this.detail[i].task_title.charCodeAt();
               saveTitle.push(code);
            }
            console.log(saveTitle);
            saveTitle.forEach((value,index)=>{
                this.detail[index].task_title=value;
            });
            this.detail.sort(function (a,b) {
                return flag===1?a.task_title-b.task_title:b.task_title-a.task_title;
            });
            /!*for (let j = 0; j < this.detail.length; j ++) {
                let decode=decodeURI(this.detail[j].task_title);
                this.detail[j].task_title=decode;
            }*!/
        },*/
        addMsg: function addMsg() {
            this.checkFlag = true;
            this.addFlag = true;
            this.checkInfo = false;
            this.editInfo = false;
            this.detailItem = {
                'task_title': '',
                'create_time': '',
                'sender': '',
                'executor': '',
                'operations': [{
                    'edit': '编辑',
                    'check': '查看',
                    'delete': '删除'
                }] };
        },
        addConfirm: function addConfirm() {

            if (this.detailItem.task_title === '' || this.detailItem.create_time === '' || this.detailItem.sender === '' || this.detailItem.executor === '') {
                this.mentionFlag = true;
            } else {
                this.detail.push(JSON.parse(JSON.stringify(this.detailItem)));
                this.detail_copy.push(JSON.parse(JSON.stringify(this.detailItem)));
                this.checkFlag = false;
                this.detailItem = {};
            }
        },
        addCancel: function addCancel() {
            this.checkFlag = false;
            this.detailItem = {};
        },
        mentionConfirm: function mentionConfirm() {
            this.mentionFlag = false;
        },
        edit: function edit(item) {
            this.checkFlag = true;
            this.editInfo = true;
            this.checkInfo = false;
            this.addFlag = false;
            this.curMsg = [];
            this.curAddress = item;
            this.saveMsg = JSON.parse(JSON.stringify(item));
            this.curMsg.push(this.saveMsg); //item会导致detail中的数据随时变化,JSON.parse(JSON.stringify(item))不会跟着变化
            //console.log(this.curMsg);
        },
        editConfirm: function editConfirm() {
            this.checkFlag = false;
            var index = this.detail.indexOf(this.curAddress);
            //console.log(this.curMsg);
            this.detail.splice(index, 1, this.curMsg[0]);
            //console.log(this.detail);
        },
        editCancel: function editCancel() {
            this.checkFlag = false;
        },
        check: function check(item) {
            this.checkFlag = true;
            this.editInfo = false;
            this.checkInfo = true;
            this.addFlag = false;
            this.curAddress = item;
            this.curMsg = [];
            this.curMsg.push(item);
            /*let tpl=`
                任务标题：<div>${item.task_title}</div>
                创建时间：<div>${item.create_time}</div>
                发送者：<div>${item.sender}</div>
                执行人：<div >${item.executor}</div>
            `;
            $("#insert").append('<div>abc</div>');*/
        },
        change: function change() {
            this.checkInfo = false;
            this.editInfo = true;
        },
        del: function del(item) {
            this.deleteFlag = true;
            this.deleteMsg = item;
            //console.log(this.deleteMsg);
        },
        confirm: function confirm() {
            var index = this.detail.indexOf(this.deleteMsg);
            //console.log(index);
            this.detail.splice(index, 1);
            this.deleteFlag = false;
        }
    }
});
/*
Vue.filter('chooseStyle',function () {

});*/