export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          completed: boolean;
          date_and_time: string;
          description: string;
          frequency: unknown | null;
          id: number;
          is_recurring: boolean;
          name: string;
          people_required: number;
          task_priority: Database['public']['Enums']['task_priority'];
          user_id: string;
          values_associated: string[] | null;
          village_id: number;
        };
        Insert: {
          completed: boolean;
          date_and_time: string;
          description: string;
          frequency?: unknown | null;
          id?: number;
          is_recurring: boolean;
          name: string;
          people_required: number;
          task_priority: Database['public']['Enums']['task_priority'];
          user_id: string;
          values_associated?: string[] | null;
          village_id: number;
        };
        Update: {
          completed?: boolean;
          date_and_time?: string;
          description?: string;
          frequency?: unknown | null;
          id?: number;
          is_recurring?: boolean;
          name?: string;
          people_required?: number;
          task_priority?: Database['public']['Enums']['task_priority'];
          user_id?: string;
          values_associated?: string[] | null;
          village_id?: number;
        };
        Relationships: [];
      };
      users: {
        Row: {
          date_of_birth: string | null;
          email_address: string;
          external_accounts: string[] | null;
          first_name: string;
          full_name: string;
          id: string;
          image_url: string | null;
          last_name: string;
        };
        Insert: {
          date_of_birth?: string | null;
          email_address: string;
          external_accounts?: string[] | null;
          first_name: string;
          full_name: string;
          id?: string;
          image_url?: string | null;
          last_name: string;
        };
        Update: {
          date_of_birth?: string | null;
          email_address?: string;
          external_accounts?: string[] | null;
          first_name?: string;
          full_name?: string;
          id?: string;
          image_url?: string | null;
          last_name?: string;
        };
        Relationships: [];
      };
      users_to_tasks: {
        Row: {
          task_id: number;
          user_id: string;
        };
        Insert: {
          task_id: number;
          user_id: string;
        };
        Update: {
          task_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_to_tasks_task_id_tasks_id_fk';
            columns: ['task_id'];
            isOneToOne: false;
            referencedRelation: 'tasks';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'users_to_tasks_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      users_to_villages: {
        Row: {
          user_id: string;
          village_id: number;
        };
        Insert: {
          user_id: string;
          village_id: number;
        };
        Update: {
          user_id?: string;
          village_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'users_to_villages_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'users_to_villages_village_id_villages_id_fk';
            columns: ['village_id'];
            isOneToOne: false;
            referencedRelation: 'villages';
            referencedColumns: ['id'];
          }
        ];
      };
      villages: {
        Row: {
          created_at: string;
          description: string;
          id: number;
          name: string;
          values: string[];
        };
        Insert: {
          created_at: string;
          description: string;
          id?: number;
          name: string;
          values?: string[];
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: number;
          name?: string;
          values?: string[];
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      requesting_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      task_priority: 'low' | 'medium' | 'high';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
