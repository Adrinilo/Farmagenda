import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, deleteUser, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  
  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  
  logout() {
    localStorage.removeItem('persona');
    localStorage.removeItem('admin');
    return signOut(this.auth);
  }

  async deleteUser(user: User) {
    try {
      await deleteUser(user);
      console.log('Usuario eliminado exitosamente');
    } catch (error) {
      console.log('Error al eliminar el usuario:', error);
    }
  }
}
