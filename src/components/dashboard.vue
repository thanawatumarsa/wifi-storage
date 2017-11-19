<template lang="html">
  <div class="dashboard">
    <div class="row">
      <each-project :wifiInfo="wifiInfo" :toAccessPoint="toAccessPoint" :removeProject="removeProject"></each-project>
    <div class="col-xs-6 col-md-3">
      <div href="#" class="thumbnail addProject" data-toggle="modal" data-target="#basicModal" style="cursor:pointer">
        <h3>+ New Project </h3>
      </div>
    </div>
  </div>
  <!-- Add Project -->
  <div class="modal fade" id="basicModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">Add Project</h4>
      </div>
      <div class="modal-body">
        <form>
            <div class="form-group">
              <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Project name" v-model="newProject.projectName">
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button @click="addProject()" type="button" class="btn btn-primary" data-dismiss="modal">+ Add</button>
      </div>
    </div>
  </div>
</div>
  </div>

</template>

<script>
import eachProject from './eachProject'

export default {
  props: ['addProject', 'newProject', 'wifiInfo', 'removeProject', 'toAccessPoint', 'chkLogin'],
  components: {
    eachProject
  },
  mounted () {
    this.chkLogin()
  }
}
</script>

<style lang="css">
.thumbnail {
  height: 90px;
}
.dashboard {
  margin-top: 8%
}
.card {
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}
.addProject {
  color: white;
  background-color: #337AB7;
}
.addProject:hover {
  background-color: #30739c;
}
h4 {
  text-align: left;
}
</style>
