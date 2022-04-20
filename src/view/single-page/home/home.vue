<template>
    <div>
        <Select size="large" v-model="addressId" style="width:200px" @on-change="provinceChange">
            <Option v-for="item in provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <p>&nbsp;</p>
        <Row style="background:#eee;padding:20px">
            <Col span="11">
                <Card shadow>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>所在省份：{{provinceName}}</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                </Card>
            </Col>
            <Col span="11" offset="2">
                <Card shadow>
                    <p>累计确诊人数：{{total}} 人</p>
                    <p>&nbsp;</p>
                    <p>累计治愈人数：{{good}} 人</p>
                    <p>&nbsp;</p>
                    <p>累计死亡人数：{{death}} 人</p>
                </Card>
            </Col>
        </Row>

        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
import { getCountData, getNewsData } from '@/api/data'

export default {
    name: 'home',
    components: {},
    data () {
        return {
            addressId: '',
            provinceName: '',
            total: 0,
            good: 0,
            death: 0,
            columns1: [
                {
                    title: '新闻主题',
                    key: 'title'
                },
                {
                    title: '发布时间',
                    key: 'publish_time'
                },
                {
                    title: '新闻链接',
                    key: 'content',
                    render:(h, params) => {
                        return h("span",
                            {
                                domProps: {
                                    innerHTML: "<a href='"+params.row.content+"' target='_blank'>"+params.row.content+"</a>",
                                }
                            }
                        )
                    }
                }
            ],
            data1: [
                {
                    title: '安阳新增本土无症状感染者14例',
                    publish_time: '2022-04-17 13:23:32',
                    content: 'http://www.163.com/dy/article/H55K07JQ05455NIL.html',
                },
                {
                    title: '4月16日安阳新增无症状感染者13例',
                    publish_time: '2022-04-17 08:50:19',
                    content: 'http://www.163.com/dy/article/H554BUJF0545B07P.html',
                },
            ],
            provinceList: [
                {
                    value: '北京',
                    label: '北京'
                },
                {
                    value: '上海',
                    label: '上海'
                },
                {
                    value: '天津',
                    label: '天津'
                },
                {
                    value: '重庆',
                    label: '重庆'
                },
                {
                    value: '内蒙古',
                    label: '内蒙古'
                },
                {
                    value: '广西',
                    label: '广西'
                },
                {
                    value: '西藏',
                    label: '西藏'
                },
                {
                    value: '宁夏',
                    label: '宁夏'
                },
                {
                    value: '新疆',
                    label: '新疆'
                },
                {
                    value: '香港',
                    label: '香港'
                },
                {
                    value: '澳门',
                    label: '澳门'
                },
                {
                    value: '河北',
                    label: '河北'
                },
                {
                    value: '山西',
                    label: '山西'
                },
                {
                    value: '辽宁',
                    label: '辽宁'
                },
                {
                    value: 'jilin',
                    label: '吉林'
                },
                {
                    value: '黑龙江',
                    label: '黑龙江'
                },
                {
                    value: '江苏',
                    label: '江苏'
                },
                {
                    value: '浙江',
                    label: '浙江'
                },
                {
                    value: '安徽',
                    label: '安徽'
                },
                {
                    value: '福建',
                    label: '福建'
                },
                {
                    value: '江西',
                    label: '江西'
                },
                {
                    value: '山东',
                    label: '山东'
                },
                {
                    value: '河南',
                    label: '河南'
                },
                {
                    value: '湖北',
                    label: '湖北'
                },
                {
                    value: '湖南',
                    label: '湖南'
                },
                {
                    value: '广东',
                    label: '广东'
                },
                {
                    value: '海南',
                    label: '海南'
                },
                {
                    value: '四川',
                    label: '四川'
                },
                {
                    value: '贵州',
                    label: '贵州'
                },
                {
                    value: '云南',
                    label: '云南'
                },
                {
                    value: '陕西',
                    label: '陕西'
                },
                {
                    value: '甘肃',
                    label: '甘肃'
                },
                {
                    value: '青海',
                    label: '青海'
                },
                {
                    value: '台湾',
                    label: '台湾'
                }
            ],
        }
    },
    mounted () {
        this.init();
    },
    methods: {
        init() {
            let that = this;
            let addressId = this.addressId;
            this.initData(addressId);
        },
        provinceChange(value) {
            this.initData(value);
        },
        initData(addressId) {
            let that = this;
            getCountData({addressId }).then(res => {
                let data = res.data.data;
                that.provinceName = data.addressId;
                that.total = data.sumCount;
                that.good = data.goodCount;
                that.death = data.deathCount;
            });

            getNewsData({addressId}).then(res => {
                let data = res.data.data;
                if ("暂无数据" == data) {
                    that.data1 = [];
                    return;
                }
                that.data1 = data;
            })
        }
    }
}
</script>

<style lang="less">
.count-style {
    font-size: 50px;
}
</style>
