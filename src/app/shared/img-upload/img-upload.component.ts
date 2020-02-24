import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { tap, finalize } from 'rxjs/operators';

export interface ImageObj { path: string; url: string; }

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss']
})
export class ImgUploadComponent implements OnInit, OnDestroy {

  @Input() image: ImageObj;
  @Input() bucket: string;
  @Output() imageUploaded = new EventEmitter<ImageObj>();
  selectedFileCount: number;
  maxFileUploadCount: number;
  imagesToBeDeleted: ImageObj[];
  currentImage: ImageObj;

  downloadURL: string;
  uploadPercent$: Observable<number>;
  subscription: Subscription;
  snapshot;

  constructor(private storage: AngularFireStorage) {
    // this.storageBucket = 'productImages';
    this.imagesToBeDeleted = [];
    this.selectedFileCount = 0;
    this.maxFileUploadCount = 1;
  }

  ngOnInit() {
    console.log('Inputs from parent component...');
    console.log('1. image: ', this.image);
    console.log('2. image: ', this.bucket);

    if (this.image) {
      if (this.image.path && this.image.url) {
        this.currentImage = this.image;
        this.downloadURL = this.image.url;
        this.updateFileCount(1);
      }
    }
  }



  startUpload(imageFiles: FileList) {
    console.log('From fileController');
    if (imageFiles[0]) {
      console.log('Selected file: ', imageFiles[0]);

      const image = imageFiles[0];
      const imagePath = `${this.bucket}/${Date.now()}_${image.name}`;
      const storageRef = this.storage.ref(imagePath);
      const uploadTask = this.storage.upload(imagePath, image);

      // Watch file upload process...
      this.uploadPercent$ = uploadTask.percentageChanges();

      this.snapshot = uploadTask.snapshotChanges().pipe(
        tap(console.log),
        finalize(async () => {
          this.downloadURL = await storageRef.getDownloadURL().toPromise();
          this.updateFileCount(1);
          this.currentImage = { path: imagePath, url: this.downloadURL };
          this.imageUploaded.emit(this.currentImage);
        })
      );
    }
  }

  updateFileCount(counter: number) {
    this.selectedFileCount = this.selectedFileCount + counter;
  }

  deleteImage(imgURL: string) {
    if (this.currentImage.url === imgURL) {
      this.imagesToBeDeleted.push(this.currentImage);
      this.updateFileCount(-1);
      this.downloadURL = null;
      this.imageUploaded.emit({ path: '', url: '' });
      this.uploadPercent$ = null;
      // this.cleanup(this.imagesToBeDeleted); // Todo: Remove the method.....
    }
  }

  cleanup(images: ImageObj[]) {
    console.log(' #### Cleanup: Free storage for these images ####');
    images.forEach(image => {
      this.storage.ref(image.path).delete();
    });
  }

  ngOnDestroy() {
    console.log('ngOnDestroy: Cleanup(imagesToBeDeleted)');
    this.cleanup(this.imagesToBeDeleted);
  }



}
