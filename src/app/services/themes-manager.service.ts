import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { map, take } from 'rxjs/operators'
import { MetaTag } from '../website/models/meta.model';
import { Router } from '@angular/router';
import firebase from "firebase"
import { environment } from 'src/environments/environment';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { PLATFORM_ID, Injector } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ThemesManagerService {
  testingMode = environment.testing
  isBrowser
  customPagesRoute = ["home", "services", "products", "gallery", "payments", "about", "contact","cart","checkout","order-successful"]
  domainName = ""
  customDomain = ""
  shareLink = ""
  data: any
  gallery = []
  carousel = []
  services = []
  products = []
  videos = []
  videosAllId = []
  embedUrl = []
  secureVideoLinks = []
  id: any
  testimonials = []
  private urlMeta: string = "og:url";
  private titleMeta: string = "og:title";
  private descriptionMeta: string = "og:description";
  private imageMeta: string = "og:image";
  private secureImageMeta: string = "og:image:secure_url";
  private twitterTitleMeta: string = "twitter:text:title";
  private twitterImageMeta: string = "twitter:image";
  public ngNavigatorShareService: NgNavigatorShareService;
  constructor(@Inject(PLATFORM_ID) platformId, private injector: Injector, public db: AngularFirestore, private title: Title, private meta: Meta, public router: Router, ngNavigatorShareService: NgNavigatorShareService, private domSanitizer: DomSanitizer) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.ngNavigatorShareService = ngNavigatorShareService;
    this.setDomain()
  }


  setDomain() {
    console.log("browser:host", window.location.hostname)
    if (!this.isBrowser) {
      console.log("server host:", this.injector.get('host'))
      let ssrRequestHost = this.injector.get('host')
      if (this.testingMode || ssrRequestHost == environment.hostdomain) {

      }
      else {
        this.customDomain = this.injector.get('host')
        this.setAll()
      }
    }
    else {
      if ((this.testingMode) || (window.location.hostname == environment.hostdomain || window.location.hostname == environment.hostdomain || window.location.hostname == "localhost")) {

      }
      else {
        this.customDomain = window.location.hostname
        this.setAll()
      }
    }


  }


  setData() {
    this.db.collection("users", ref => ref.where("domainName", "==", this.domainName)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe((userdata: any) => {
      if (userdata.length == 0) {
        this.router.navigateByUrl("/validity-expired")
        return
      }
      if (userdata) {
        // console.log(userdata[0].validity.toDate()>new Date())
        // console.log(userdata)
        if (userdata[0].active && (userdata[0].validity.toDate() > new Date())) {
          // console.log("userdata",userdata)
          this.data = userdata[0]
          this.id = this.data.id
          if (!this.data.metaTags) {
            this.data.metaTags = {
              title: "",
              description: "",
              imageUrl: "",
              authorName: "",
              keyWords: ""
            }
          }
          this.shareLink = encodeURIComponent("*" + this.data.metaTags.title + "* \n" + this.data.metaTags.description + "\n" + environment.domain + this.data.domainName)
          this.setMetaTags()
          this.setGallery()
          this.setProducts()
          this.setServices()
          this.setVideos()
          this.setTestimonials()
          this.setCarousel()
        }
      }
    })
  }

  setDataForCustomDomain() {
    this.db.collection("users", ref => ref.where("customDomains", "array-contains", this.customDomain)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe((userdata: any) => {
      //console.log(userdata)
      if (userdata.length == 0) {
        // console.log("custom", userdata.length)
        this.router.navigateByUrl("/validity-expired")
        return
      }
      if (userdata) {
        // console.log(userdata[0].validity.toDate()>new Date())
        // console.log(userdata)
        //console.log(userdata)
        if (userdata[0].active && (userdata[0].validity.toDate() > new Date())) {
          // console.log("userdata",userdata)
          this.data = userdata[0]
          this.id = this.data.id
          let url = "https://" + this.customDomain
          this.shareLink = encodeURIComponent("*" + this.data.metaTags.title + "* \n" + this.data.metaTags.description + "\n" + url)
          this.setMetaTags()
          this.setGallery()
          this.setProducts()
          this.setServices()
          this.setVideos()
          this.setTestimonials()
          this.setCarousel()
        }
      }
    })
  }

  setGallery() {
    this.db.collection("users").doc(this.id).collection("gallery", ref => ref.orderBy("sort", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(gallery => {
      // console.log("gallery",gallery)
      this.gallery = gallery
    })
  }

  // getGallery() {
  //   return this.db.collection("users").doc(this.id).collection("gallery", ref => ref.orderBy("sort", "asc")).snapshotChanges().pipe(take(1),
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as any;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   )
  // }

  setProducts() {
    this.db.collection("users").doc(this.id).collection("products", ref => ref.orderBy("priority", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(products => {
      console.log("products", products)
      this.products = products
    })
  }

  // getProducts() {
  //   return this.db.collection("users").doc(this.id).collection("products", ref => ref.orderBy("priority", "asc")).snapshotChanges().pipe(take(1),
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as any;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   )
  // }

  setServices() {
    this.db.collection("users").doc(this.id).collection("services", ref => ref.orderBy("priority", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(services => {
      // console.log("services",services)
      this.services = services
    })
  }

  // getServices() {
  //   return this.db.collection("users").doc(this.id).collection("services", ref => ref.orderBy("priority", "asc")).snapshotChanges().pipe(take(1),
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as any;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   )
  // }

  setCarousel() {
    this.db.collection("users").doc(this.id).collection("carousel", ref => ref.orderBy("sort", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(carousel => {
      // console.log("carousel",carousel)
      this.carousel = carousel
    })
  }

  setVideos() {
    this.db.collection("users").doc(this.id).collection("videos", ref => ref.orderBy("sort", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(async videos => {
      console.log("videos", videos)
      this.videos = []
      this.videosAllId = []
      this.embedUrl = []
      this.secureVideoLinks = []
      this.videos = videos
      await this.seperateVideosId()
      await this.getEmbedUrl()
      await this.byPassTheUrl()
    })
  }

  // getVideos() {
  //   return this.db.collection("users").doc(this.id).collection("videos", ref => ref.orderBy("sort", "asc")).get().pipe(
  //     map(actions => actions.docs.map(a => {
  //       const data = a.data() as any;
  //       const id = a.id;
  //       return { id, ...data };
  //     }))
  //   )
  // }

  seperateVideosId() {
    this.videos.forEach(element => {
      console.log(element.youTubeLink)
      // console.log(element.youTubeLink.length)
      // let n = element.youTubeLink.length
      // console.log(element.youTubeLink.split(17,n-1))
      let url = element.youTubeLink.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
      let id = (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0]
      //console.log("Youtube id", id)
      this.videosAllId.push(id)
      //console.log(this.videosAllId)
    })
  }

  getEmbedUrl() {
    this.videosAllId.forEach(element => {
      let url = "https://www.youtube.com/embed/" + element
      this.embedUrl.push(url)
    })
    console.log("embedUrl", this.embedUrl)
  }

  byPassTheUrl() {
    this.embedUrl.forEach(element => {
      this.secureVideoLinks.push(this.domSanitizer.bypassSecurityTrustResourceUrl(element))
    })
    console.log("secureVideoLinks", this.secureVideoLinks)
  }

  setAll() {
    if (!this.testingMode && this.customDomain) {
      this.setDataForCustomDomain()
      console.log("inside custom domain")
    }
    else {
      this.setData()
    }
  }



  changeDomain(domainname) {
    this.domainName = domainname
    this.setAll()
  }

  public setMetaTags(): void {
    //console.log(this.data)
    var imageUrl = this.data.metaTags.imageUrl;
    var tags = [
      new MetaTag(this.urlMeta, window.location.href, true),
      new MetaTag(this.titleMeta, this.data.metaTags.title, true),
      new MetaTag(this.descriptionMeta, this.data.metaTags.description, true),
      new MetaTag("description", this.data.metaTags.description, true),
      new MetaTag("title", this.data.metaTags.title, true),
      new MetaTag(this.imageMeta, imageUrl, true),
      new MetaTag(this.secureImageMeta, imageUrl, true),
      new MetaTag(this.twitterTitleMeta, this.data.metaTags.title, false),
      new MetaTag(this.twitterImageMeta, imageUrl, false)
    ];
    this.title.setTitle(this.data.metaTags.title);
    this.setTags(tags);
  }

  private setTags(tags: MetaTag[]): void {
    tags.forEach(siteTag => {
      const tag = siteTag.isFacebook ? this.meta.getTag(`property='${siteTag.name}'`) : this.meta.getTag(`name='${siteTag.name}'`);
      if (siteTag.isFacebook) {
        this.meta.updateTag({ property: siteTag.name, content: siteTag.value });
      } else {
        this.meta.updateTag({ name: siteTag.name, content: siteTag.value });
      }
    });
  }

  makeEnquiry(name: string, contact: string, message: string, email: string) {
    let timestamp = firebase.firestore.Timestamp.now()
    if (!email) {
      email = ""
    }
    return this.db.collection("users").doc(this.data.id).collection("enquiry").add({ name, contact, message, timestamp, email })
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  share(file?) {

    if (!this.ngNavigatorShareService.canShare()) {
      alert(`This service/api is not supported in your Browser`);
      return;
    }
    if (file) {
      //console.log("in file")
      this.ngNavigatorShareService.share({
        title: this.data.metaTags.title + "\n",
        text: decodeURIComponent(this.shareLink),
        //url: this.customDomain?this.customDomain:(environment.domain+this.data.domainName),
        //files:[file]
      }).then((response) => {
        //console.log(response);
      })
        .catch((error) => {
          // console.log(error);
        });
    } else {
      //console.log("not file")
      this.ngNavigatorShareService.share({
        title: this.data.metaTags.title,
        text: decodeURIComponent(this.shareLink),
        //url: this.customDomain?this.customDomain:(environment.domain+this.data.domainName),
      }).then((response) => {
        //console.log(response);
      })
        .catch((error) => {
          //console.log(error);
        });
    }
  }

  setTestimonials() {
    this.db.collection("users").doc(this.id).collection("testimonials", ref => ref.orderBy("priority", "asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(testimonials => {
      // console.log("testimonials",testimonials)
      this.testimonials = testimonials
    })
  }

  // getTestimonials() {
  //   return this.db.collection("users").doc(this.id).collection("testimonials", ref => ref.orderBy("priority", "asc")).snapshotChanges().pipe(take(1),
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as any;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   )
  // }

  isPageRoute(path) {
    if (true) {
      if (this.customPagesRoute.indexOf(path) != -1) {
        return true
      }
      else {
        return false
      }
    }
  }

  // getServiceDetails(slug) {
  //   return this.db.collection("users").doc(this.id).collection("services", ref => ref.where("slug", "==", slug)).snapshotChanges().pipe(take(1),
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as any;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   )
  // }

  getServiceDetails(slug) {
    return this.db.collection("users").doc(this.id).collection("services", ref => ref.where("slug", "==", slug)).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }


}
