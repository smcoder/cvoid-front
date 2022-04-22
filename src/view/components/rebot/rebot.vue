<template>
    <div>
        <Row style="background:#eee;padding:20px">
            <Col span="11">
                <Card shadow>
                    <p>询问内容：</p>
                    <p>&nbsp;</p>
                    <p><Input v-model="formCustom.key" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input></p>
                    <p>&nbsp;</p>
                    <Button type="primary" @click="handleSubmit('formCustom')">发送
                        
                    </Button>
                </Card>

            </Col>
            <Col span="11" offset="2">
                <Card shadow>
                    <p>客服回复：</p>
                    <p><Input v-model="formCustom.content" type="textarea" :autosize="{minRows: 2,maxRows: 30}" readonly></Input></p>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import Tables from '_c/tables'
import { getSuggestion } from '@/api/data'

export default {
    name: 'tables_page',
    components: {
        Tables
    },
    data () {
        return {
            formCustom: {
                key: '',
                content: ''
            }
        }
    },
    methods: {
        handleSubmit () {
            let key = this.formCustom.key;
            getSuggestion({ key }).then(res => {
                let value = res.data.data;
                this.formCustom.content = this.formCustom.content + '\n' + value[0].content;
            })
        }
    }
}
</script>

<style>

</style>
