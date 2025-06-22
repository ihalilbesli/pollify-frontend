import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home/home.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { PollDetailComponent } from './components/poll/poll-detail/poll-detail.component';
import { PollSolveComponent } from './components/poll/poll-solve/poll-solve.component';
import { PollCreateComponent } from './components/poll/poll-create/poll-create.component';
import { QuestionManageComponent } from './components/question-manage/question-manage.component';
import { OptionManageComponent } from './components/option-manage/option-manage.component';
import { MyPoolsComponent } from './components/poll/my-pools/my-pools.component';
import { PollEditComponent } from './components/poll/poll-edit/poll-edit.component';
import { PollResultComponent } from './components/poll/poll-result/poll-result.component';
import { PollJoinedComponent } from './components/poll/poll-joined/poll-joined.component';
import { roleGuard } from './guards/role.guard';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { AdminPollsComponent } from './components/admin/admin-polls/admin-polls.component';
import { ComplaintComponent } from './components/complaint/complaint.component';
import { AdminComplaintsComponent } from './components/admin/admin-complaints/admin-complaints.component';
import { AdminAccesLogComponent } from './components/admin/admin-acces-log/admin-acces-log.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'poll/:id', component: PollDetailComponent },


    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [roleGuard(['USER', 'ADMIN'])]
    },
    {
        path: 'poll/:id/solve',
        component: PollSolveComponent

    },
    {
        path: 'poll-create',
        component: PollCreateComponent,
        canActivate: [roleGuard(['USER'])]

    },
    {
        path: 'poll/:pollId/questions',
        component: QuestionManageComponent, canActivate: [roleGuard(['USER'])]
    },
    {
        path: 'question/:questionId/options',
        component: OptionManageComponent,
        canActivate: [roleGuard(['USER'])]
    },
    {
        path: 'my-polls', component: MyPoolsComponent,
        canActivate: [roleGuard(['USER'])]
    },
    {
        path: 'poll-edit/:id', component: PollEditComponent,
        canActivate: [roleGuard(['USER'])]
    },
    {
        path: 'poll-results/:pollId',
        component: PollResultComponent,

    },
    {
        path: 'joined-polls', component: PollJoinedComponent,
        canActivate: [roleGuard(['USER'])]
    },
    {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [roleGuard(['ADMIN'])]
    },
    {
        path: 'admin-users',
        component: AdminUserComponent,
        canActivate: [roleGuard(['ADMIN'])]
    },
    {
        path: 'admin-polls',
        component: AdminPollsComponent,
        canActivate: [roleGuard(['ADMIN'])]
    },
    {
        path: 'complaint-create',
        component: ComplaintComponent,
        canActivate: [roleGuard(['USER'])]
    },
    {
        path: 'admin-complaints',
        component: AdminComplaintsComponent,
        canActivate: [roleGuard(['ADMIN'])]
    },
    {
        path: 'admin-acces-log',
        component: AdminAccesLogComponent,
        canActivate: [roleGuard(['ADMIN'])]
    },

];
