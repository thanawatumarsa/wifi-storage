<template lang="html">
  <div class="">
    <div v-for="(wifi, index) in wifiInfo" class="col-xs-6 col-md-3">
      <div @click.self="toAccessPoint(index)" class="thumbnail" style="cursor:pointer">
        <div class="projectCon" style="cursor:pointer">
          <p>
            <h3 @click.self="toAccessPoint(index)">{{ wifi.projectName }}</h3>
          </p>
        </div>
        <p>
          <div @click="removeTemp(wifi, index)" class="delRight" href="#" data-toggle="modal" data-target="#removeProject" style="cursor:pointer">
            <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </div>
        </p>
      </div>
    </div>
    <div class="modal fade" id="removeProject" tabindex="-1" role="dialog" aria-labelledby="basicModal3" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">Remove Project</h4>
          </div>
          <div class="modal-header">
            <h3>Are you sure to remove this Project?</h3>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancle</button>
            <button  @click="removeProject(removeindex)" type="button" class="btn btn-primary" data-dismiss="modal">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ['wifiInfo', 'removeProject', 'toAccessPoint'],
  data () {
    return {
      removeindex: ''
    }
  },
  methods: {
    removeTemp: function (wifi, index) {
      this.removeindex = index
    }
  }
}
</script>

<style lang="css">
.projectCon {
  width: 100%;
}
.head {
  width: 100%;
}
.proContent {
  width: 100%;
}
.delRight {
  float: right;
  padding-right: 5px;
  z-index: -2;
}
.thumbnail {
  box-shadow: 2px 2px 6px 0 rgba(0,0,0,0.2);
  transition: 0.2s;
  padding-bottom: 4%;
  z-index: -1;
}
.thumbnail:hover {
    box-shadow: 4px 4px 12px 0 rgba(0,0,0,0.2);
    transition: 0.1s;
}
</style>
