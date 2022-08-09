<template>
  <div>
    <Layout>
      <Tabs class-prefix="type" :data-source="typeList" :value.sync="type" />
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
      <div>
        <!-- type: {{ type }}
        <br />
        interval: {{ interval }}
        <br /> -->
        <ol>
          <li v-for="(group, index) in result" :key="index">
            <h3 class="title">{{ beautify(group.title) }}</h3>
            <ol>
              <li v-for="item in group.items" :key="item.createAt" class="record">
                <span class="tags">{{ tagString(item.tags) }}</span>
                <span class="notes">{{ item.notes }}</span>
                <span>￥{{ item.amount }}</span>
              </li>
            </ol>
          </li>
        </ol>

      </div>
    </Layout>
  </div>
</template>



<script lang="ts">
import Types from '@/components/Money/Types.vue';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import dayjs from 'dayjs';

@Component({
  components: { Tabs, Types },
})
export default class Statistics extends Vue {
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')){
      return '今天';
    }else if(day.isSame(now.subtract(1, 'day'), 'day')){
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')){
      return '前天';
    } // 如果是今年就不用写年份了
     else if (day.isSame(now, 'year')){
      return day.format('M月D日');
     }
    else {
      return day.format('YYYY年MM月DD日');
    }
  }
  tagString(id: string[]) {
    if (id.length === 0) {
      return '无标签';
    }
    let tagList = window.tagList;
    // 通过传进来的id 来遍历tagList，找到对应的tagName
    let tagNames = id.map(id => {
      let tag = tagList.find(tag => tag.id === id);
      return tag?.name;
    }).join(',');
    return tagNames;
  }
  get result() {
    const recordList = window.recordList;
    type hahsTableItem = {
      title: string,
      items: RecordItem[];
    };
    const hahsTable: { [key: string]: hahsTableItem } = {};
    for (let i = 0; i < recordList.length; i++) {
      let date = recordList[i].createAt
      // 将 date 转换成日期对象
      let date_pass = new Date(date!);
      // 获取当前的年月日
      const year = date_pass.getFullYear();
      const month = date_pass.getMonth() + 1;
      const day = date_pass.getDate();
      const resDate = year + '-' + month + '-' + day + '-';
      hahsTable[resDate] = hahsTable[resDate] || { title: resDate, items: [] };
      hahsTable[resDate].items.push(recordList[i]);
    }
    return hahsTable;
  }
  type = '-';
  interval = 'day';
  intervalList = [
    { text: '按天', value: 'day' },
    { text: '按周', value: 'week' },
    { text: '按月', value: 'month' },
  ];
  typeList = [
    { text: '支出', value: '-' },
    { text: '收入', value: '+' },
  ];
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);

    &.selected {
      background: #32b67a;
      color: #fff;
    }

    &::after {
      display: none;
    }
  }

  li.interval-tabs-item {
    height: 52px;
    font-size: 18px;
    // 加左右的边框
    border-left: rgb(252, 252, 252) dashed 1px;
    border-right: rgb(252, 252, 252) dashed 1px;
    // border: rgb(252, 252, 252)  dashed  1px;
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}

.record {
  background: white;
  @extend %item;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

.tags {
  white-space: nowrap;
}
</style>