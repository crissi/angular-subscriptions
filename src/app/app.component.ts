import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import gql from 'graphql-tag';
import { OperationDefinitionNode } from 'graphql';
import { InMemoryCache } from 'apollo-cache-inmemory';

const SUBSCRIBE_TO_ONLINE_USERS = gql`
 subscription getOnlineUsers {
    newUser {
      name
    }
 }`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-subscriptions';



  constructor(private apollo: Apollo, httpLink: HttpLink) {


    this.apollo.subscribe({
      query: SUBSCRIBE_TO_ONLINE_USERS,
    }).subscribe(({ data }) => {

      console.log('got data ', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    }); 
  }
}
