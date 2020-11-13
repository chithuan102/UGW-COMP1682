import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppCoreService } from 'src/app/app.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit {


  roleDetail = {
    id: 0,
    title: '',
    permissions: []
  };
  listOfData: any[] = [];
  listTmpPermission: any[] = [];

  selectedPermissions: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private appCoreService: AppCoreService) {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.getRoleDetail(params.id);

      }
    });
  }

  ngOnInit(): void {
  }


  async getRoleDetail(id) {
    const response = await this.appCoreService.getRoleDetail(id);
    this.roleDetail = response.data;
    this.selectedPermissions = this.roleDetail.permissions.map((permission) => permission.id);
    this.getPermissions();
  }

  async getPermissions() {
    const response = await this.appCoreService.getPermissions();
    this.listOfData = response.data.items;
    this.listTmpPermission = response.data.items;
    this.listOfData = this.listOfData.map((data) => {
      if (this.selectedPermissions.includes(data.id)) {
        return {
          ...data,
          status: true
        };
      }
      return {
        ...data,
        status: false
      };
    });


  }

  onSeaching(text) {
    if (text) {
      this.listOfData = this.listTmpPermission.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
    } else {
      this.listOfData = this.listTmpPermission;
    }
    this.listOfData = this.listOfData.map((permission) => {
      return {
        ...permission,
        status: this.selectedPermissions.includes(permission.id) ? true : false
      };
    });
  }

  async onSave() {
    const permissions = this.listOfData.filter((permission) => permission.status);
    console.log();
    const body = {
      ...this.roleDetail,
      permissions
    };
    const response = await this.appCoreService.updateRoleDetail(body);
    if (response.code === 200) {
      this.appCoreService.success('Update successfully');
      this.getRoleDetail(this.roleDetail.id);
    }


  }

 async onStatusChange(event, data) {
    if (event) {
      this.selectedPermissions.push(data.id);
    }
    data.status = event;
    const permissions = this.listOfData.filter((permission) => permission.status);
    console.log();
    const body = {
      ...this.roleDetail,
      permissions
    };
    const response = await this.appCoreService.updateRoleDetail(body);
  }
}
