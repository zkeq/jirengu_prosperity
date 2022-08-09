<template>
  <div>
    <Layout>
      <Tabs class-prefix="type" :data-source="typeList" :value.sync="type" />
      <div>
        <div class="chart-wrapper" ref="chartWrapper">
          <Chart class="chart" :options="chartOptions"/>
        </div>
        <ol v-if="groupList.length>0">
          <li v-for="(group, index) in groupList" :key="index">
            <h3 class="title">{{ beautify(group.title) }} <span>￥{{group.total}}</span></h3>
            <ol>
              <li v-for="item in group.items" :key="item.createAt" class="record">
                <span class="tags">{{ tagString(item.tags) }}</span>
                <span class="notes">{{ item.notes }}</span>
                <span>￥{{ item.amount }}</span>
              </li>
            </ol>
          </li>
        </ol>
        <div v-else class="noRusult">
            目前没有相关记录
        </div>
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
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';
import _ from 'lodash';
import day from 'dayjs';

@Component({
  components: { Tabs, Types, Chart },
})
export default class Statistics extends Vue {
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } // 如果是今年就不用写年份了
    else if (day.isSame(now, 'year')) {
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
    }).join('|');
    return tagNames;
  }
     get keyValueList() {
      const today = new Date();
      const array = [];
      console.log(this.groupList);
      for (let i = 0; i <= 29; i++) {
        // this.recordList = [{date:7.3, value:100}, {date:7.2, value:200}]
        const dateString = day(today)
          .subtract(i, 'day').format('YYYY-MM-DD');
        const found = _.find(this.groupList, {
          title: dateString
        });
        array.push({
          key: dateString, value: found ? found.total : 0
        });
      }
      array.sort((a, b) => {
        if (a.key > b.key) {
          return 1;
        } else if (a.key === b.key) {
          return 0;
        } else {
          return -1;
        }
      });
      console.log('array');
      console.log(array);
      return array;
    }

     get chartOptions() {
      const keys = this.keyValueList.map(item => item.key);
      const values = this.keyValueList.map(item => item.value);
      console.log('values');
      console.log(values);
      return {
        grid: {
          left: 0,
          right: 0,
        },
        xAxis: {
          type: 'category',
          data: keys,
          axisTick: {alignWithLabel: true},
          axisLine: {lineStyle: {color: '#666'}},
          axisLabel: {
            formatter: function (value: string, index: number) {
              return value.substring(5);
            }
          }
        },
        yAxis: {
          type: 'value',
          // show: false
        },
        series: [{
          // symbol: 'circle',
          symbolSize: 12,
          itemStyle: {borderWidth: 1, color: '#32b67a', borderColor: '#32b67a'},
          data: values,
          type: 'bar',
        }],
        tooltip: {
          show: true, triggerOn: 'click',
          position: 'top',
          formatter: '{c}'
        }
      };
    }
  get groupList() {
    const recordList = window.recordList;
    const newList = clone(recordList)
      .filter(r => r.type === this.type)
      .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());

    if (newList.length === 0) {
      return [] as Result;;
    }

    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{ title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]] }];
    for (let i = 1; i < newList.length; i++) {
      if (dayjs(newList[i].createAt).format('YYYY-MM-DD') === dayjs(newList[i - 1].createAt).format('YYYY-MM-DD')) {
        result[result.length - 1].items.push(newList[i]);
      } else {
        result.push({ title: dayjs(newList[i].createAt).format('YYYY-MM-DD'), items: [newList[i]] });
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum +  item.amount;;
      }, 0);
    });
    return result;
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
  background: #32b67a;
  border-radius: 4px;
  color: #fff;
  padding: 0 4px;
  font-size: small;
}
.noRusult{
  padding: 16px;
  text-align: center;
  font-weight: 400;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>