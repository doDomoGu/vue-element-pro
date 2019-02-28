let data = []

let data_one = {
  id: 10001,
  name: '活动2019',
  enable : 1
}

const campaign_num = 100

for(let i = 0; i < campaign_num ;i++){
  data.push(
    {
      id :data_one.id + i ,
      name: data_one.name + ( i > 0 ? '-'+i : '' ),
      enable : 1
    }
  )
}
export default data 