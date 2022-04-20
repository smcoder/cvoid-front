<template>
    <div>
        <Card>
            <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
                    @on-delete="handleDelete"/>
            <Page :total="3" show-total />
        </Card>
    </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'

export default {
    name: 'tables_page',
    components: {
        Tables
    },
    data () {
        return {
            columns: [
                { title: 'ID', key: 'id' },
                { title: '标题', key: 'title' },
                { title: '创建人', key: 'createName' },
                { title: '创建时间', key: 'createTime' }
            ],
            tableData: []
        }
    },
    methods: {
        handleDelete (params) {
            console.log(params)
        }
    },
    mounted () {
        getTableData().then(res => {
            // this.tableData = res.data
            this.tableData = [
                {
                    'id': '1',
                    'title': '我发布的第一个标题',
                    'createName': '张三',
                    'createTime': '2021-03-20 22:00:01'
                },
                {
                    'id': '2',
                    'title': '我发布的第一个标题',
                    'createName': '张三',
                    'createTime': '2021-03-20 22:10:45'
                },
                {
                    'id': '3',
                    'title': '我发布的第三个个标题',
                    'createName': '张三',
                    'createTime': '2021-03-20 22:30:21'
                }
            ]
        })
    }
}
</script>

<style>

</style>
