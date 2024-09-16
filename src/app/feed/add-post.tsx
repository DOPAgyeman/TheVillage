import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from 'expo-router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAddPost } from '@/api';
import { Button, ControlledInput, View } from '@/ui';
import { showErrorMessage, showInfoMessage } from '@/ui/flash-message';

const schema = z.object({
  title: z.string().min(10),
  body: z.string().min(120),
});

type FormType = z.infer<typeof schema>;

export default function AddPost() {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { mutate: addPost, isPending } = useAddPost();

  const onSubmit = (data: FormType) => {
    console.log(data);
    addPost(
      { ...data, userId: 1 },
      {
        onSuccess: () => {
          showInfoMessage('Post added successfully');
          // here you can navigate to the post list and refresh the list data
          //queryClient.invalidateQueries(usePosts.getKey());
        },
        onError: () => {
          showErrorMessage('Error adding post');
        },
      }
    );
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Add Post',
          headerBackTitle: 'Feed',
        }}
      />
      <View className="flex-1 p-4 ">
        <ControlledInput
          name="title"
          label="Title"
          control={control}
          testID="title"
        />
        <ControlledInput
          name="body"
          label="Content"
          control={control}
          multiline
          testID="body-input"
        />
        <Button
          label="Add Post"
          loading={isPending}
          onPress={handleSubmit(onSubmit)}
          testID="add-post-button"
        />
      </View>
    </>
  );
}
