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
        component: PollSolveComponent,
        canActivate: [roleGuard(['USER', 'ADMIN'])]
    },
    {
        path: 'poll-create',
        component: PollCreateComponent,
        canActivate: [roleGuard(['USER', 'ADMIN'])]
    },
    {
        path: 'poll/:pollId/questions',
        component: QuestionManageComponent, canActivate: [roleGuard(['USER', 'ADMIN'])]
    },
    {
        path: 'question/:questionId/options',
        component: OptionManageComponent,
        canActivate: [roleGuard(['USER', 'ADMIN'])]
    },
    {
        path: 'my-polls', component: MyPoolsComponent,
        canActivate: [roleGuard(['USER', 'ADMIN'])]
    },
    {
        path: 'poll-edit/:id', component: PollEditComponent,
        canActivate: [roleGuard(['USER', 'ADMIN'])]
    },
    {
        path: 'poll-results/:pollId',
        component: PollResultComponent,
        canActivate: [roleGuard(['USER', 'ADMIN'])]
    },
    {
        path: 'joined-polls', component: PollJoinedComponent,
        canActivate: [roleGuard(['USER', 'ADMIN'])]
    },
    {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [roleGuard(['ADMIN'])]
    },
    { path: '**', redirectTo: '' },
];
