import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  /**
   * Check for if it is opened in mobile
   */
  mobileQuery: MediaQueryList;

  /**
   * Listener function on resize and if mobile query is matched
   */
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public chatService: ChatService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    // trigger detect changes when mobile query is truthful.
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    // Unsubscribe from the change listener on destroy.
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
