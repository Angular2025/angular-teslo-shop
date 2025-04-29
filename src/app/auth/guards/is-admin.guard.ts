import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const IsAdminGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService)

  await firstValueFrom(authService.checkStatus())

  return authService.isAdmin();
};
