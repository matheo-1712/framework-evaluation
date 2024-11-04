import { View } from "../framework/views/View";
import { User, UserProps } from "./User";
import { UserEdit } from "./UserEdit";

export class UserList extends View<User, UserProps> {
    userCollection = User.buildCollection();

    template(): string {
        return `
            <div>
                <h1>Utilisateurs</h1>
                <ul>
                    ${this.userCollection.models.length > 0 
                        ? this.userCollection.models.map(user => `
                            <li>
                                <button class="userClick" data-user-id="${user.get('id')}">
                                    <span>${user.get('name')}</span>
                                    <span>${user.get('age')}</span>
                                </button>
                            </li>
                        `).join('') 
                        : '<li>Aucun utilisateur trouvé.</li>'
                    }
                </ul>
            </div>
        `;
    }    

    onUserClick(event: Event): void {
        const target = event.target as HTMLElement;
        const userId = target.getAttribute('data-user-id');
        if (userId) {
            const user = this.userCollection.models.find(u => u.get('id') === userId);
            if (user) {
                const rootElement = document.getElementById('root') as HTMLElement;
                const userEdit = new UserEdit(rootElement, user);
                userEdit.render();
            }
        }
    }

    eventsMap() : {[key: string] : () => void} {
        return {
            'click:.userClick': this.onUserClick
        }
    }

}
