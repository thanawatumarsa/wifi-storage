<template lang="html">
  <div class="dashboard">
    <div class="adminContent">
      <div class="border">
        <h2>Project Lists</h2><br><hr>
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
                <div class="input-group">
                  <span class="input-group-addon" id="basic-addon1">
                    <span class="glyphicon glyphicon-pushpin"></span>
                  </span>
                  <input type="text" id="addProject" name="addProjectt" class="form-control" placeholder="Project name" v-model="newProject.projectName">
                </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" name="addProject"class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click="addProject()" type="button" class="btn btn-primary" data-dismiss="modal" :disabled="newProject.projectName == ''">+ Add</button>
          </div>
        </div>
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
  margin-top: 3%
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
.borderDashboard {
  border: 2px solid #e6e6e6;
  border-radius: 5px;
  float: center;
  background-color: white;
}
.border {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
}
.adminContent {
  border: 1px solid #a6a6a6;
  border-radius: 5px;
  transition: 0.3s;
  margin-top: 3%;
  float: center;
  background-color: white;
}
h4 {
  text-align: left;
}
</style>
