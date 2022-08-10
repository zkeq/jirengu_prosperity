<template>
    <div>
        <!-- {{ record }} -->
        <!-- {{record}} 变成表格-->
        <table class="ws-table-all">

            <tbody>
                <tr>
                    <th>
                        条目
                    </th>
                    <th>
                        信息
                    </th>
                </tr>

                <tr>
                    <td>
                        总金额
                    </td>

                    <td>
                        {{ record.amount }} 元
                    </td>
                </tr>

                <tr>
                    <td>
                        类型
                    </td>
                    <td>
                        {{ beautifyType(record.type) }}
                    </td>
                </tr>

                <tr>
                    <td>
                        备注
                    </td>
                    <td>
                        {{ record.notes }}
                    </td>
                </tr>

                <tr>
                    <td>
                        标签
                    </td>
                    <td>
                        {{ beautifyTags(record.tags) }}
                    </td>
                </tr>

                  <!-- <tr>
                    <td>
                        日期
                    </td>
                    <td>
                        {{ beautifyDate(record.createAt) }}
                    </td>
                </tr> -->

            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";

@Component
export default class CurrentDetails extends Vue {
    @Prop({ required: true }) record!: RecordItem;
    beautifyType(type: string) {
        return type === '-' ? '支出' : '收入';
    }
    beautifyTags(tags: string[]) {
        let tagList = window.tagList;
        let result = [];
        for (let tag of tags) {
            for (let item of tagList) {
                if (item.id === tag) {
                    result.push(item.name);
                }
            }
        }
        return result.join('、');
    }
    beautifyDate(isoString: string | undefined) {
        return dayjs(isoString).format("YYYY-MM-DD");
    }
}
</script>

<style scoped>
table {
    font-size: 16px;
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    line-height: 13px;
}

td,
th {
    text-align: center;
    padding: 8px;
}

th {
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #04AA6D;
    color: white;
}

tr th:first-child {
    width: 30%;
}

.ws-table-all tr:nth-child(even) {
    background-color: #E7E9EB;
}

.ws-table-all tr {
    border-bottom: 1px solid #ddd;
}

.ws-table-all tr:nth-child(odd) {
    background-color: #fff;
}
</style>